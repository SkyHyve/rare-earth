import React from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { debounce } from 'throttle-debounce';
import {
  useFloating,
  FloatingFocusManager,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react';
import { SearchState, SortField, DEBOUNCE_INPUT_TIME_MS } from './types';
import { ColumnDragHandle } from './ColumnDragHandle';

const TableHeader = function(props: any){
  const { tableId, ref } = props;
  const labelId = React.useId();
  const sortDescriptionId = React.useId();
  const [searchInput, setSearchInput] = React.useState({
    string: props.search?.fields?.[props.column_key]?.string?.text,
    number: {
      gt: props.search?.fields?.[props.column_key]?.number?.gt?.value ?? null,
      lt: props.search?.fields?.[props.column_key]?.number?.lt?.value ?? null,
      gtRaw: props.search?.fields?.[props.column_key]?.number?.gt?.value !== null && 
             props.search?.fields?.[props.column_key]?.number?.gt?.value !== undefined
        ? props.search?.fields?.[props.column_key]?.number?.gt?.value.toString() 
        : '',
      ltRaw: props.search?.fields?.[props.column_key]?.number?.lt?.value !== null && 
             props.search?.fields?.[props.column_key]?.number?.lt?.value !== undefined
        ? props.search?.fields?.[props.column_key]?.number?.lt?.value.toString() 
        : '',
    }
  });
  const [searchOptionsOpen, setSearchOptionsOpen] = React.useState(false);

  // Memoized event handlers for inputs
  const handleStringFilterChange = React.useCallback((value: string) => {
    setSearchInput(prev => ({
      ...prev,
      string: value?.trim() === '' ? null : value
    }));
  }, []);

  const handleNumberGtChange = React.useCallback((value: string) => {
    setSearchInput(prev => ({
      ...prev,
      number: {
        ...prev.number,
        gtRaw: value
      }
    }));
  }, []);

  const handleNumberLtChange = React.useCallback((value: string) => {
    setSearchInput(prev => ({
      ...prev,
      number: {
        ...prev.number,
        ltRaw: value
      }
    }));
  }, []);

  // Validate raw numeric inputs and update actual values
  React.useEffect(() => {
    setSearchInput((_searchInput) => {
      const newNumber = { ..._searchInput.number };
      
      // Validate gt (greater than) value
      if (_searchInput.number.gtRaw === '') {
        newNumber.gt = null;
      } else {
        const isValidPattern = /^-?\d*\.?\d*$/.test(_searchInput.number.gtRaw);
        if (isValidPattern) {
          const isIntermediateState = _searchInput.number.gtRaw === '-' || 
                                      _searchInput.number.gtRaw === '.' || 
                                      _searchInput.number.gtRaw === '-.' || 
                                      _searchInput.number.gtRaw.endsWith('.');
          if (!isIntermediateState) {
            const numValue = parseFloat(_searchInput.number.gtRaw);
            newNumber.gt = isNaN(numValue) ? null : numValue;
          } else {
            newNumber.gt = null;
          }
        } else {
          newNumber.gt = null;
        }
      }
      
      // Validate lt (less than) value
      if (_searchInput.number.ltRaw === '') {
        newNumber.lt = null;
      } else {
        const isValidPattern = /^-?\d*\.?\d*$/.test(_searchInput.number.ltRaw);
        if (isValidPattern) {
          const isIntermediateState = _searchInput.number.ltRaw === '-' || 
                                      _searchInput.number.ltRaw === '.' || 
                                      _searchInput.number.ltRaw === '-.' || 
                                      _searchInput.number.ltRaw.endsWith('.');
          if (!isIntermediateState) {
            const numValue = parseFloat(_searchInput.number.ltRaw);
            newNumber.lt = isNaN(numValue) ? null : numValue;
          } else {
            newNumber.lt = null;
          }
        } else {
          newNumber.lt = null;
        }
      }
      
      return {
        ..._searchInput,
        number: newNumber
      };
    });
  }, [searchInput.number.gtRaw, searchInput.number.ltRaw]);

  const { refs, floatingStyles, context } = useFloating({
    open: searchOptionsOpen,
    onOpenChange: setSearchOptionsOpen,
    middleware: [
      offset(5), 
      flip({ fallbackPlacements: ['top-start', 'bottom-end', 'top-end'] }), 
      shift({ padding: 10 })
    ],
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start',
    strategy: 'fixed'
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role
  ]);

  // Apply styles directly to the DOM element to avoid inline styles
  React.useEffect(() => {
    if (searchOptionsOpen && refs.floating.current) {
      const element = refs.floating.current;
      element.style.position = floatingStyles.position as string;
      element.style.top = `${floatingStyles.top ?? 0}px`;
      element.style.left = `${floatingStyles.left ?? 0}px`;
      element.style.transform = floatingStyles.transform as string;
    }
  }, [searchOptionsOpen, floatingStyles, refs.floating]);

  React.useEffect(() => {
    setSearchInput((_searchInput) => ({
      string: props.search?.fields?.[props.column_key]?.string?.text,
      number: {
        gt: props.search?.fields?.[props.column_key]?.number?.gt?.value ?? null,
        lt: props.search?.fields?.[props.column_key]?.number?.lt?.value ?? null,
        // Preserve existing raw values or initialize from actual values if they don't exist
        gtRaw: _searchInput.number?.gtRaw ?? (
          props.search?.fields?.[props.column_key]?.number?.gt?.value !== null && 
          props.search?.fields?.[props.column_key]?.number?.gt?.value !== undefined
          ? props.search?.fields?.[props.column_key]?.number?.gt?.value.toString() 
          : ''
        ),
        ltRaw: _searchInput.number?.ltRaw ?? (
          props.search?.fields?.[props.column_key]?.number?.lt?.value !== null && 
          props.search?.fields?.[props.column_key]?.number?.lt?.value !== undefined
          ? props.search?.fields?.[props.column_key]?.number?.lt?.value.toString() 
          : ''
        ),
      }
    }));
  }, [JSON.stringify(props?.search?.fields?.[props?.column_key])]);

  // Create a stable debounced function
  const debouncedSetSearch = React.useMemo(
    () => debounce(
      props.debounceTime ?? DEBOUNCE_INPUT_TIME_MS,
      (newSearchInput: typeof searchInput) => {
        props.setSearch((_search: SearchState) => ({
          ..._search,
          fields: {
            ..._search.fields,
            [props.column_key]: {
              ..._search.fields[props.column_key],
              string: {
                ..._search.fields[props.column_key].string,
                text: newSearchInput.string,
              },
              number: {
                ..._search.fields[props.column_key].number,
                gt: {
                  ..._search.fields[props.column_key].number.gt!,
                  value: newSearchInput.number.gt
                },
                lt: {
                  ..._search.fields[props.column_key].number.lt!,
                  value: newSearchInput.number.lt
                },
              }
            }
          }
        }));
      },
      { atBegin: false }
    ),
    [props.debounceTime, props.column_key, props.setSearch]
  );

  // Use the debounced function when searchInput changes
  React.useEffect(() => {
    debouncedSetSearch(searchInput);
  }, [searchInput, debouncedSetSearch]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const sortFieldClick = React.useCallback((event: React.MouseEvent) => {
    let thisFieldReverse = null;
    for (let i = 0; i < props.sortFields?.length ?? 0; i++){
      let sortField = props.sortFields[i];
      if (sortField['key'] == props.column_key){
        thisFieldReverse = sortField['reverse'];
      }
    }

    const newSortFields: SortField[] = [];
    switch(event.shiftKey){
      case false:
        switch (thisFieldReverse){
          case false:
            newSortFields.push({'key': props.column_key, 'reverse': true});
            break;
          case true:
          case null:
            newSortFields.push({'key': props.column_key, 'reverse': false});
            break;
        };
        break;
      case true:
        let currentKeyIncluded = false;
        for (let i = 0; i < props.sortFields?.length ?? 0; i++){
          let sortField = props.sortFields[i];
          if (sortField['key'] == props.column_key){
            currentKeyIncluded = true;
            switch (thisFieldReverse){
              case false:
                newSortFields.push({'key': props.column_key, 'reverse': true})
                break;
              case true:
              case null:
                newSortFields.push({'key': props.column_key, 'reverse': false})
                break;
            }
          } else{
            newSortFields.push(sortField);
          }
        }
        if (!currentKeyIncluded){
          newSortFields.push({'key': props.column_key, 'reverse': false})
        }
        break;
    }

    props.setSortFields(newSortFields);
  }, [props.sortFields, props.column_key, props.setSortFields]);

  let ascendingActive = false;
  let descendingActive = false;
  let sortIndex = null;
  
  for (let i = 0; i < props.sortFields?.length ?? 0; i++){
    let sortField = props.sortFields[i];
    if (sortField.key == props.column_key){
      if (sortField.reverse) {
        descendingActive = true;
      } else {
        ascendingActive = true;
      }
      sortIndex = i + 1;
    }
  }

  function renderSearchInput(){
    switch(props?.search?.fields?.[props?.column_key]?._type){
      case 'string':
        return(
          <input
            className="rare-earth-input rare-earth-input-sm"
            placeholder="Filter"
            value={searchInput?.string ?? ''}
            onChange={(event) => handleStringFilterChange(event.target.value)}
            type="text"
            name={`filter-${tableId}-${props.column_key}`}
            autoComplete="off"
            data-testid={`filter-input-${tableId}-${props.column_key}`}
            data-filter-type="string"
          />
        );
      case 'number':
        // Check if the input contains only valid characters but is still invalid as a number
        const isValidGtPattern = searchInput.number?.gtRaw && /^-?\d*\.?\d*$/.test(searchInput.number.gtRaw);
        const isValidLtPattern = searchInput.number?.ltRaw && /^-?\d*\.?\d*$/.test(searchInput.number.ltRaw);
        
        // These are intermediate states that are invalid as final values
        const gtIsIntermediateState = searchInput.number?.gtRaw === '-' || 
                                      searchInput.number?.gtRaw === '.' || 
                                      searchInput.number?.gtRaw === '-.' || 
                                      (searchInput.number?.gtRaw && searchInput.number.gtRaw.endsWith('.'));
        
        const ltIsIntermediateState = searchInput.number?.ltRaw === '-' || 
                                      searchInput.number?.ltRaw === '.' || 
                                      searchInput.number?.ltRaw === '-.' || 
                                      (searchInput.number?.ltRaw && searchInput.number.ltRaw.endsWith('.'));
        
        // Check for min/max validation
        const gtValue = searchInput.number?.gt;
        const ltValue = searchInput.number?.lt;
        const hasMinMaxMismatch = gtValue !== null && ltValue !== null && gtValue > ltValue;
        
        // Show error if: contains invalid characters OR is an incomplete number OR min > max
        const gtHasError = searchInput.number?.gtRaw && (!isValidGtPattern || gtIsIntermediateState) || hasMinMaxMismatch;
        const ltHasError = searchInput.number?.ltRaw && (!isValidLtPattern || ltIsIntermediateState) || hasMinMaxMismatch;
        
        return(
          <div className="rare-earth-numeric-filter-container">
            {/* Lower bound row */}
            <div className="rare-earth-filter-content-sm">
              <div className="rare-earth-numeric-filter-row">
                <input
                  className={`rare-earth-number-input rare-earth-numeric-filter-input ${gtHasError ? 'error' : ''}`}
                  type="text"
                  placeholder="Min"
                  value={searchInput.number?.gtRaw ?? ''}
                  aria-invalid={gtHasError}
                  aria-describedby={gtHasError ? `gt-error-${tableId}-${props.column_key}` : undefined}
                  name={`filter-${tableId}-${props.column_key}-min`}
                  autoComplete="off"
                  data-testid={`filter-min-${tableId}-${props.column_key}`}
                  data-filter-type="number"
                  onChange={(event) => handleNumberGtChange(event.target.value)}
                />
                <label className="rare-earth-checkbox-sm">
                  <input
                    type="checkbox"
                    checked={props.search?.fields?.[props.column_key]?.number?.gt?.equals ?? false}
                    onChange={(event) => props.setSearch((_search: SearchState) => ({
                      ..._search,
                      fields: {
                        ..._search.fields,
                        [props.column_key]: {
                          ..._search.fields[props.column_key],
                          number: {
                            ..._search.fields[props.column_key].number,
                            gt: {
                              ..._search.fields[props.column_key].number.gt!,
                              equals: event.target.checked
                            }
                          }
                        }
                      }
                    }))}
                  />
                  Inclusive
                </label>
              </div>
              {gtHasError && <div id={`gt-error-${tableId}-${props.column_key}`} className="rare-earth-error-text" role="alert">
                {hasMinMaxMismatch ? 'Min cannot be greater than max' : 
                 gtIsIntermediateState ? 'Incomplete number' : 'Invalid number format'}
              </div>}
            </div>
            {/* Upper bound row */}
            <div className="rare-earth-filter-content-sm">
              <div className="rare-earth-numeric-filter-row">
                <input
                  className={`rare-earth-number-input rare-earth-numeric-filter-input ${ltHasError ? 'error' : ''}`}
                  type="text"
                  placeholder="Max"
                  value={searchInput.number?.ltRaw ?? ''}
                  aria-invalid={ltHasError}
                  aria-describedby={ltHasError ? `lt-error-${tableId}-${props.column_key}` : undefined}
                  name={`filter-${tableId}-${props.column_key}-max`}
                  autoComplete="off"
                  data-testid={`filter-max-${tableId}-${props.column_key}`}
                  data-filter-type="number"
                  onChange={(event) => handleNumberLtChange(event.target.value)}
                />
                <label className="rare-earth-checkbox-sm">
                  <input
                    type="checkbox"
                    checked={props.search?.fields?.[props.column_key]?.number?.lt?.equals ?? false}
                    onChange={(event) => props.setSearch((_search: SearchState) => ({
                      ..._search,
                      fields: {
                        ..._search.fields,
                        [props.column_key]: {
                          ..._search.fields[props.column_key],
                          number: {
                            ..._search.fields[props.column_key].number,
                            lt: {
                              ..._search.fields[props.column_key].number.lt!,
                              equals: event.target.checked
                            }
                          }
                        }
                      }
                    }))}
                  />
                  Inclusive
                </label>
              </div>
              {ltHasError && <div id={`lt-error-${tableId}-${props.column_key}`} className="rare-earth-error-text" role="alert">
                {hasMinMaxMismatch ? 'Max cannot be less than min' : 
                 ltIsIntermediateState ? 'Incomplete number' : 'Invalid number format'}
              </div>}
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  function renderPopup(){
    if (props?.search?.fields?.[props?.column_key]?._type == 'string'){
      return(
        <div className="rare-earth-filter-content">
          <label className="rare-earth-checkbox">
            <input
              type="checkbox"
              checked={props.search.fields[props.column_key].string.trim}
              onChange={(event) => props.setSearch((_search: SearchState) => ({
                ..._search,
                fields: {
                  ..._search.fields,
                  [props.column_key]: {
                    ..._search.fields[props.column_key],
                    string: {
                      ..._search.fields[props.column_key].string,
                      trim: event.target.checked
                    }
                  }
                }
              }))}
            />
            Trim
          </label>
          <label className="rare-earth-checkbox">
            <input
              type="checkbox"
              checked={props.search.fields[props.column_key].string.caseSensitive}
              onChange={(event) => props.setSearch((_search: SearchState) => ({
                ..._search,
                fields: {
                  ..._search.fields,
                  [props.column_key]: {
                    ..._search.fields[props.column_key],
                    string: {
                      ..._search.fields[props.column_key].string,
                      caseSensitive: event.target.checked
                    }
                  }
                }
              }))}
            />
            Case Sensitive
          </label>
          <label className="rare-earth-checkbox">
            <input
              type="checkbox"
              checked={props.search.fields[props.column_key].string.isRegex}
              onChange={(event) => props.setSearch((_search: SearchState) => ({
                ..._search,
                fields: {
                  ..._search.fields,
                  [props.column_key]: {
                    ..._search.fields[props.column_key],
                    string: {
                      ..._search.fields[props.column_key].string,
                      isRegex: event.target.checked
                    }
                  }
                }
              }))}
            />
            Regex
          </label>
        </div>
      );
    } else if (props?.search?.fields?.[props?.column_key]?._type == 'number'){
      return(
        <div className="rare-earth-filter-content">
          <label className="rare-earth-checkbox">
            <input
              type="checkbox"
              checked={props.search.fields[props.column_key].number.omitNonNumeric}
              onChange={(event) => props.setSearch((_search: SearchState) => ({
                ..._search,
                fields: {
                  ..._search.fields,
                  [props.column_key]: {
                    ..._search.fields[props.column_key],
                    number: {
                      ..._search.fields[props.column_key].number,
                      omitNonNumeric: event.target.checked
                    }
                  }
                }
              }))}
            />
            Omit Non Numeric
          </label>
          <label className="rare-earth-checkbox">
            <input
              type="checkbox"
              checked={props.search.fields[props.column_key].number.gt?.equals}
              onChange={(event) => props.setSearch((_search: SearchState) => ({
                ..._search,
                fields: {
                  ..._search.fields,
                  [props.column_key]: {
                    ..._search.fields[props.column_key],
                    number: {
                      ..._search.fields[props.column_key].number,
                      gt: {
                        ..._search.fields[props.column_key].number.gt!,
                        equals: event.target.checked,
                      }
                    }
                  }
                }
              }))}
            />
            Inclusive Greater Than
          </label>
          <label className="rare-earth-checkbox">
            <input
              type="checkbox"
              checked={props.search.fields[props.column_key].number.lt?.equals}
              onChange={(event) => props.setSearch((_search: SearchState) => ({
                ..._search,
                fields: {
                  ..._search.fields,
                  [props.column_key]: {
                    ..._search.fields[props.column_key],
                    number: {
                      ..._search.fields[props.column_key].number,
                      lt: {
                        ..._search.fields[props.column_key].number.lt!,
                        equals: event.target.checked,
                      }
                    }
                  }
                }
              }))}
            />
            Inclusive Less Than
          </label>
        </div>
      );
    }
    return null;
  }

  const sortControl = (
    <div className="rare-earth-flex-xs">
      <button
        className="rare-earth-sort-button"
        onClick={(event) => sortFieldClick(event)}
        aria-label={`Sort by ${props.column.label ?? props.column_key}`}
        aria-describedby={sortDescriptionId}
        type="button"
        data-testid={`sort-button-${tableId}-${props.column_key}`}
        data-column={props.column_key}
        data-sort-state={ascendingActive ? 'ascending' : descendingActive ? 'descending' : 'none'}
      >
        <div className="rare-earth-flex-xs">
          <span aria-hidden="true">{sortIndex}</span>
          <div className="rare-earth-filter-content">
            <div className={`rare-earth-triangle ${ascendingActive ? 'active' : ''}`} aria-hidden="true"></div>
            <div className={`rare-earth-triangle descending ${descendingActive ? 'active' : ''}`} aria-hidden="true"></div>
          </div>
        </div>
      </button>
      {!props.controlsOnly && <span id={labelId}>{props.column.label ?? props.column_key.toString()}</span>}
      <span id={sortDescriptionId} hidden>
        {ascendingActive ? 'Ascending' : descendingActive ? 'Descending' : 'Not sorted'}
        {sortIndex ? `, priority ${sortIndex}` : ''}
      </span>
    </div>
  );
  const Cell = props.controlsOnly ? 'td' : 'th';

  return(
    <Cell
      className={props.controlsOnly ? 'rare-earth-column-controls' : 'rare-earth-header-cell'}
      rowSpan={props.controlsOnly ? undefined : props.rowSpan || 1}
      scope={props.controlsOnly ? undefined : 'col'}
      headers={props.headingId}
      data-testid={props.controlsOnly ? `column-controls-${tableId}-${props.column_key}` : undefined}
      aria-labelledby={props.controlsOnly ? undefined : labelId}
      aria-sort={!props.controlsOnly && sortIndex === 1 ? (ascendingActive ? 'ascending' : 'descending') : undefined}
    >
      <div className={props.controlsOnly ? 'rare-earth-flex-xs' : 'rare-earth-filter-content'}>
        {props.controlsOnly ? sortControl : (
          <ColumnDragHandle
            tableId={tableId}
            columnKey={props.column_key}
            columnIndex={props.column_index}
            columnOrder={props.columns.order}
            onOrderChange={(order) => props.setColumns({ ...props.columns, order })}
            headerRefs={ref}
          >
            {sortControl}
          </ColumnDragHandle>
        )}
        <div className="rare-earth-popover">
          <div className="rare-earth-filter-controls">
            <div
              ref={refs.setReference}
              className={`rare-earth-search-icon ${searchOptionsOpen ? 'active' : ''}`}
              {...getReferenceProps()}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-expanded={searchOptionsOpen}
              aria-controls={`filter-popup-${tableId}-${props.column_key}`}
              aria-label={`Filter options for ${props.column.label ?? props.column_key}`}
            >
              <div className="rare-earth-filter-content">
                <FaSearchPlus/>
                <span className="rare-earth-filter-type-indicator">
                  {props?.search?.fields?.[props?.column_key]?._type != 'string' ? "123" : "ABC"}
                </span>
              </div>
            </div>
            {renderSearchInput()}
          </div>
          {searchOptionsOpen && (
            <FloatingFocusManager context={context} modal={false} returnFocus={true}>
              <div
                ref={refs.setFloating}
                id={`filter-popup-${tableId}-${props.column_key}`}
                className="rare-earth-popover-content"
                role="dialog"
                aria-label="Filter options"
                {...getFloatingProps()}
              >
                <div className="rare-earth-filter-content">
                  <div className="rare-earth-chip-group">
                    <button
                      className={`rare-earth-chip ${props?.search?.fields?.[props?.column_key]?._type === 'string' ? 'active' : ''}`}
                      disabled={props.column.typeToggleable === false}
                      onClick={() => {
                        if (props.column.typeToggleable === false) return;
                        props.setSearch((_search: SearchState) => ({
                          ..._search,
                          fields: {
                            ..._search.fields,
                            [props.column_key]: {
                              ..._search.fields[props.column_key],
                              _type: 'string',
                              string: {
                                ..._search.fields[props.column_key].string,
                                text: null,
                              },
                              number: {
                                ..._search.fields[props.column_key].number,
                                gt: { ..._search.fields[props.column_key].number.gt, value: null },
                                lt: { ..._search.fields[props.column_key].number.lt, value: null },
                              }
                            },
                          }
                        }));
                        setSearchInput({
                          string: null,
                          number: { gt: null, lt: null, gtRaw: '', ltRaw: '' }
                        });
                      }}
                    >
                      Text
                    </button>
                    <button
                      className={`rare-earth-chip ${props?.search?.fields?.[props?.column_key]?._type === 'number' ? 'active' : ''}`}
                      disabled={props.column.typeToggleable === false}
                      onClick={() => {
                        if (props.column.typeToggleable === false) return;
                        props.setSearch((_search: SearchState) => ({
                          ..._search,
                          fields: {
                            ..._search.fields,
                            [props.column_key]: {
                              ..._search.fields[props.column_key],
                              _type: 'number',
                              string: {
                                ..._search.fields[props.column_key].string,
                                text: null,
                              },
                              number: {
                                ..._search.fields[props.column_key].number,
                                gt: { ..._search.fields[props.column_key].number.gt, value: null },
                                lt: { ..._search.fields[props.column_key].number.lt, value: null },
                              }
                            },
                          }
                        }));
                        setSearchInput({
                          string: null,
                          number: { gt: null, lt: null, gtRaw: '', ltRaw: '' }
                        });
                      }}
                    >
                      Numeric
                    </button>
                  </div>
                  {renderPopup()}
                </div>
              </div>
            </FloatingFocusManager>
          )}
        </div>
      </div>
    </Cell>
  );
}

export { TableHeader };
