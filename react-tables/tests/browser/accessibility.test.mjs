import assert from 'node:assert/strict';
import { before, after, test } from 'node:test';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { chromium, expect } from '@playwright/test';
import { rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import * as XLSX from 'xlsx';

let browser;
let server;
let origin;

before(async () => {
  const bundle = await rollup({
    input: 'tests/browser/fixture.js',
    plugins: [
      replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true }),
      nodeResolve({ browser: true }),
      commonjs(),
    ],
  });
  const { output } = await bundle.generate({ format: 'iife' });
  await bundle.close();
  const css = await readFile('dist/css/react-tables.css');
  server = createServer((request, response) => {
    if (request.url === '/fixture.js') {
      response.setHeader('Content-Type', 'text/javascript');
      response.end(output[0].code);
    } else if (request.url === '/style.css') {
      response.setHeader('Content-Type', 'text/css');
      response.end(css);
    } else {
      response.end('<!doctype html><html lang="en"><title>Table regression fixture</title><link rel="stylesheet" href="/style.css"><main id="root"></main><script src="/fixture.js"></script></html>');
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {});
});

after(async () => {
  await browser?.close();
  if (server) {
    await new Promise(resolve => server.close(resolve));
  }
});

async function withPage(run) {
  const page = await browser.newPage();
  page.setDefaultTimeout(5000);
  try {
    await page.goto(origin);
    await page.locator('#IPAM tbody tr').first().waitFor();
    await run(page);
  } finally {
    await page.close();
  }
}

test('native headers have only column labels, including while controls are focused', () => withPage(async page => {
  const table = page.locator('#IPAM table');
  await expect(table).toHaveAccessibleName('IPAM');
  await expect(table).not.toHaveAttribute('aria-describedby');
  await expect(table.getByRole('columnheader')).toHaveCount(6);
  for (const name of ['Address', 'Description', 'count']) {
    await expect(table.getByRole('columnheader', { name, exact: true })).toHaveCount(1);
  }
  await table.getByRole('button', { name: 'Sort by Address', exact: true }).focus();
  await expect(table.getByRole('columnheader', { name: 'Address', exact: true })).toHaveCount(1);
  await expect(table.locator('[role="columnheader"]')).toHaveCount(0);
  await expect(page.locator('#standalone table')).toHaveAccessibleName('Standalone addresses');
  await expect(page.locator('#standalone table').getByRole('columnheader')).toHaveCount(3);
  const help = page.locator('#IPAM details');
  await expect(help).not.toHaveAttribute('open');
  await help.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(help).toHaveAttribute('open', '');
  await expect(help).toContainText('Shift');
}));

test('headings contain only titles and controls remain available in the next row', () => withPage(async page => {
  for (const id of ['IPAM', 'standalone']) {
    const table = page.locator(`[id="${id}"] table`);
    const header = table.getByRole('columnheader', { name: 'Address', exact: true });
    await expect(header).toHaveText('Address');
    await expect(header.getByRole('button')).toHaveCount(0);
    await expect(header.getByRole('textbox')).toHaveCount(0);
    assert.doesNotMatch(await header.ariaSnapshot(), /button|textbox|Sort|Filter/);
    const controls = table.locator('thead tr').nth(1);
    await expect(controls.getByRole('button', { name: 'Sort by Address', exact: true })).toHaveCount(1);
    await expect(controls.getByRole('button', { name: 'Filter options for Address', exact: true })).toHaveCount(1);
    await expect(table).toHaveAttribute('aria-rowcount', '27');
    await expect(table.locator('tbody tr').first()).toHaveAttribute('aria-rowindex', '3');
    const headingId = await header.getAttribute('id');
    await expect(controls.getByTestId(`column-controls-${id}-prefix`)).toHaveAttribute('headers', headingId);
  }
  const cdp = await page.context().newCDPSession(page);
  const ax = await cdp.send('Accessibility.getFullAXTree');
  const headerNames = ax.nodes.filter(node => node.role?.value === 'columnheader').map(node => node.name?.value);
  for (const name of ['Address', 'Description', 'count']) {
    assert.equal(headerNames.filter(value => value === name).length, 2);
  }
  assert.ok(headerNames.every(Boolean), 'Every native header must have a name in the browser accessibility tree');
  await cdp.detach();
  const table = page.locator('#IPAM');
  const sort = table.getByRole('button', { name: 'Sort by Address', exact: true });
  await sort.focus();
  await sort.hover();
  await expect(sort).toHaveAccessibleDescription('Not sorted');
  await expect(table.locator('thead').getByRole('tooltip')).toHaveCount(0);
  const filter = table.getByRole('button', { name: 'Filter options for Address', exact: true });
  await page.keyboard.press('Tab');
  await expect(filter).toBeFocused();
  await filter.hover();
  await page.keyboard.press('Enter');
  await expect(table.getByRole('dialog')).toBeVisible();
}));

test('keyboard sorting keeps focus, exposes header state and announces multi-sort priority', () => withPage(async page => {
  const table = page.locator('#IPAM');
  const sort = table.getByRole('button', { name: 'Sort by count', exact: true });
  await sort.focus();
  await page.keyboard.press('Enter');
  await expect(sort).toBeFocused();
  await expect(table.getByRole('columnheader', { name: 'count', exact: true })).toHaveAttribute('aria-sort', 'ascending');
  await expect(table.locator('tbody tr').first().locator('td').last()).toHaveText('1');
  await page.keyboard.press('Space');
  await expect(table.getByRole('columnheader', { name: 'count', exact: true })).toHaveAttribute('aria-sort', 'descending');
  await expect(table.locator('tbody tr').first().locator('td').last()).toHaveText('25');
  const secondary = table.getByRole('button', { name: 'Sort by Description', exact: true });
  await secondary.focus();
  await page.keyboard.press('Shift+Enter');
  await expect(secondary).toBeFocused();
  await expect(table.locator('th[aria-sort]')).toHaveCount(1);
  await expect(table.locator('button[aria-sort]')).toHaveCount(0);
  await expect(table.getByRole('status')).toHaveText('Sorted by count descending, priority 1; Description ascending, priority 2.');
  await expect(secondary).toHaveAccessibleDescription('Ascending, priority 2');
  await table.getByRole('button', { name: 'Reset table to initial state' }).click();
  await expect(table.locator('th[aria-sort]')).toHaveCount(0);
  await expect(table.getByRole('status')).toHaveText('Sorting cleared.');
}));

test('filtering, filter options, pagination and custom cells still work', () => withPage(async page => {
  const table = page.locator('#IPAM');
  await table.getByTestId('filter-input-IPAM-description').fill('Branch');
  await expect(table.locator('tbody tr')).toHaveCount(10);
  await expect(table.locator('tbody tr').first().locator('td').last()).toHaveText('2');
  await table.getByRole('button', { name: 'Go to page 2', exact: true }).click();
  await expect(table.locator('tbody tr')).toHaveCount(2);
  await table.getByRole('button', { name: 'Go to page 1', exact: true }).click();
  await table.getByTestId('page-length-select-IPAM').selectOption('20');
  await expect(table.locator('tbody tr')).toHaveCount(12);
  await expect(table.getByRole('link', { name: '192.0.2.2/32', exact: true })).toBeVisible();
  const options = table.getByRole('button', { name: 'Filter options for Description', exact: true });
  await options.focus();
  await page.keyboard.press('Enter');
  await expect(table.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(table.getByRole('dialog')).toHaveCount(0);
  await expect(options).toBeFocused();
  await table.getByRole('button', { name: 'Reset table to initial state' }).click();
  await table.getByTestId('filter-min-IPAM-count').fill('23');
  await expect(table.locator('tbody tr')).toHaveCount(2);
}));

test('Escape from inside text and numeric filter dialogs returns to the matching opener', () => withPage(async page => {
  for (const id of ['IPAM', 'standalone']) {
    const table = page.locator(`[id="${id}"]`);
    for (const [label, optionName, key] of [['Description', 'Trim', 'description'], ['count', 'Omit Non Numeric', 'count']]) {
      const opener = table.getByRole('button', { name: `Filter options for ${label}`, exact: true });
      await opener.focus();
      await page.keyboard.press('Enter');
      const dialog = table.getByRole('dialog');
      await expect.poll(() => dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
      const option = dialog.getByRole('checkbox', { name: optionName, exact: true });
      await option.focus();
      const before = await option.isChecked();
      await page.keyboard.press('Space');
      await expect(option).toBeChecked({ checked: !before });
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(table.getByTestId(key === 'count' ? `filter-min-${id}-${key}` : `filter-input-${id}-${key}`)).toBeFocused();
      await opener.click();
      await expect(dialog.getByRole('checkbox', { name: optionName, exact: true })).toBeChecked({ checked: !before });
      await dialog.getByRole('checkbox', { name: optionName, exact: true }).focus();
      await page.keyboard.press('Escape');
      await expect(opener).toBeFocused();
    }
  }
}));

test('dismissing a filter by clicking another control keeps focus on that control', () => withPage(async page => {
  const table = page.locator('#IPAM');
  await table.getByRole('button', { name: 'Filter options for Address', exact: true }).click();
  await table.getByRole('dialog').getByRole('checkbox', { name: 'Trim', exact: true }).focus();
  const search = table.getByTestId('global-search-input-IPAM');
  await search.click();
  await expect(table.getByRole('dialog')).toHaveCount(0);
  await expect(search).toBeFocused();
}));

test('column reordering preserves concise header names', () => withPage(async page => {
  const table = page.locator('#IPAM');
  const dataTransfer = await page.evaluateHandle(() => new DataTransfer());
  const address = table.getByTestId('column-header-IPAM-prefix');
  const count = table.getByTestId('column-header-IPAM-count');
  await address.dispatchEvent('dragstart', { dataTransfer });
  await count.dispatchEvent('drop', { dataTransfer });
  for (const [index, name] of ['Description', 'Address', 'count'].entries()) {
    await expect(table.locator('th[scope="col"]').nth(index)).toHaveAccessibleName(name);
  }
  await expect(table.locator('thead tr').nth(1).locator('td').first().getByRole('button', { name: 'Sort by Description', exact: true })).toHaveCount(1);
  await expect(table.locator('tbody tr').first().locator('td').nth(2)).toHaveText('Office');
}));

test('SQL uses field keys while displayed labels and exports remain usable', () => withPage(async page => {
  await page.getByRole('button', { name: 'Add new table from SQL query' }).click();
  await page.getByLabel('Table Name:', { exact: true }).fill('Selected');
  await page.getByLabel('SQL Query:', { exact: true }).fill('SELECT prefix, count FROM IPAM WHERE count > 23');
  await page.getByRole('button', { name: 'Execute SQL query and create new table' }).click();
  await expect(page.locator('#Selected tbody tr')).toHaveCount(2);
  await expect(page.locator('#Selected tbody tr').first().locator('td').last()).toHaveText('24');
  await expect(page.locator('#Selected table')).toHaveAccessibleName('Selected');
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export all tables to Excel file', exact: true }).click();
  const download = await downloaded;
  const workbook = XLSX.read(await readFile(await download.path()));
  assert.deepEqual(workbook.SheetNames, ['IPAM', 'Selected']);
  assert.equal(XLSX.utils.sheet_to_json(workbook.Sheets.Selected).length, 2);
  await page.getByRole('tab', { name: 'IPAM', exact: true }).click();
  await expect(page.locator('#IPAM').getByRole('columnheader', { name: 'Address', exact: true })).toHaveCount(1);
  await page.evaluate(() => { window.open = url => { window.exportedCSV = url; }; });
  await page.locator('#IPAM').getByRole('button', { name: 'Export filtered data as CSV' }).click();
  assert.match(decodeURI(await page.evaluate(() => window.exportedCSV)), /Address,Description,count/);
}));
