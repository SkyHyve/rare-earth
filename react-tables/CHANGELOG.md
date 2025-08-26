# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.4] - 2025-01-26

### Performance Improvements
- **Memoized Callbacks**: Fixed excessive inline function creation causing unnecessary re-renders
  - Memoized `compareRecords` and `defaultCompareFunc` in DataTable
  - Memoized `exportTable` callback in DataTable
  - Memoized all event handlers in TableHeader (sorting, dragging, input changes)
  
- **Fixed Debounce Implementation**: Corrected debounce logic that was defeating its purpose
  - Created stable debounced function using `useMemo` instead of recreating on every render
  - Debounce now properly delays API calls during rapid typing
  - Significant reduction in filter/sort operations

- **Optimized Index Key Generation**: Replaced `crypto.randomUUID()` with stable ref
  - Eliminated UUID regeneration on every column change
  - Improved memoization effectiveness
  - Fixed missing dependency in `filteredRecords` useMemo

### UI/UX Improvements
- **Pagination Consistency**: Fixed shifting "Next" button position
  - Implemented consistent 7-slot layout for pagination
  - Shows all pages when total ≤ 7
  - Predictable patterns for start/middle/end navigation
  
- **Page Length Selector**: Improved option visibility logic
  - Shows all options up to filtered count plus one above
  - Removed confusing Infinity option
  
- **Table Row Hover Effects**: Refined visual feedback
  - Removed scaling effects that caused button position shifts
  - Enhanced shadow effects for better depth perception
  - Special hover effect only for index columns (bold + scale)
  
- **CSS Refinements**: Various visual improvements
  - Index columns properly styled with hover effects
  - Removed problematic row scaling
  - Better shadow effects on hover

### Bug Fixes
- **Fixed NaN in Index Columns**: Resolved issue showing NaN on initial render
  - Added proper dependency tracking for index key
  - Fixed timing issues in filtered records calculation

## [0.4.3] - 2025-01-26

### Fixed
- **React 19 Compatibility**: Fixed ref handling in TableHeader component
  - Updated component to accept `ref` as a regular prop instead of using deprecated `forwardRef`
  - Added proper null checks before accessing `ref.current`
  - Ensures compatibility with React 19's new ref handling system

## [0.4.2] - 2025-01-26

### Added
- **Comprehensive ARIA Attributes**: Extended accessibility support with additional ARIA attributes
  - `aria-describedby` for complex table descriptions and relationships
  - `aria-sort` for explicit sort state indicators (`ascending`, `descending`, `none`)
  - `aria-colindex` and `aria-colcount` for column positioning in screen readers
  - `aria-haspopup` and `aria-expanded` for filter dropdown states
  - `aria-controls` linking filter buttons to their popup dialogs
  - `aria-invalid` and error message IDs for form validation feedback
  - `aria-atomic="true"` for complete live region announcements
  - `aria-labelledby` for proper label relationships
  - `aria-setsize` and `aria-posinset` for pagination button positioning

- **Production-Ready HTML Attributes**: Complete attribute coverage for robust library usage
  - `tabindex="0"` for proper keyboard navigation on interactive elements
  - Comprehensive `data-testid` attributes for automated testing
  - `data-*` attributes for component identification and state tracking
  - `autoComplete="off"` on filter inputs to prevent browser autocomplete
  - `name` attributes for proper form field identification
  - `title` attributes for enhanced tooltips and context
  - `translate="yes"` on user-facing text for internationalization support
  - Enhanced drag-and-drop attributes for column reordering

- **Multiple Table Instance Support**: Unique IDs and test identifiers for concurrent tables
  - All IDs now include unique table identifier to prevent conflicts
  - Test IDs follow pattern: `{element}-{tableId}-{context}`
  - ARIA relationships maintain uniqueness across multiple table instances
  - Form field names are scoped per table instance
  - Error message IDs are unique per table and column

### Enhanced
- **Accessibility**: Screen readers now receive more detailed table structure information
- **Testing**: Every interactive element has unique, predictable test identifiers
- **Internationalization**: Text elements properly marked for translation tools
- **Multi-Table Support**: Libraries can now safely render multiple tables on the same page
- **Developer Experience**: Enhanced debugging with comprehensive data attributes

### Technical Details
- **Unique Table IDs**: Uses `props.id` or generates `rare-earth-table-{React.useId()}`
- **Cascading IDs**: Table ID propagated to all child components (TableControl, TableHeader, Pagination)
- **TypeScript Updates**: All interfaces updated to handle `tableId` parameter
- **Naming Patterns**: 
  - Test IDs: `data-testid="{component}-{tableId}-{context}"`
  - Form names: `name="filter-{tableId}-{columnKey}-{type}"`
  - Error IDs: `id="{type}-error-{tableId}-{columnKey}"`

## [0.4.1] - 2025-01-26

### Added
- **Full ARIA Accessibility Support**: Comprehensive accessibility attributes throughout all components
  - Proper ARIA roles for table structure (`role="table"`, `role="rowgroup"`, `role="row"`)
  - Descriptive `aria-label` attributes for all interactive elements
  - `aria-current="page"` for active pagination
  - `aria-pressed` states for sort buttons
  - `aria-live` regions for dynamic content updates
  - Semantic HTML elements (`<nav>` for pagination, `<button>` instead of `<div>`)
  - Screen reader-friendly labels and descriptions

### Fixed
- **Current Index Column**: Fixed to show position in entire filtered dataset, not just current page
  - Now correctly shows continuous numbering across pages (e.g., page 2 shows 21-40, not 1-20)
  - Updated tooltip to clarify "Current position in the filtered and sorted dataset"

## [0.4.0] - 2025-01-26

### Added
- **Dark Mode Support**: Full dark theme implementation with CSS custom properties
  - Toggle with `dark-mode` class on container
  - Comprehensive dark color scheme for all components
  - Maintains accessibility and contrast standards
- **Component Modularity**: Split monolithic Table component into individual files for better maintainability
  - `DataTable.tsx` - Main table component
  - `TableControl.tsx` - Table controls and pagination
  - `TableHeader.tsx` - Column headers with sorting and filtering
  - `Pagination.tsx` - Pagination component
  - `FloatingTooltip.tsx` - Tooltip component using Floating UI
  - `types.ts` - TypeScript type definitions
  - `index.ts` - Main export file
- **TypeScript Support**: Full TypeScript migration from JSX to TSX
  - Added comprehensive type definitions
  - Added `tsconfig.json` configuration
  - Added `test-types.tsx` for type testing
- **Standard CSS Structure**: Moved CSS to standard `dist/css/react-tables.css` location
- **Comprehensive Documentation**: Complete README.md with examples and API documentation
- **Enhanced Package.json**: 
  - Updated description and keywords for better discoverability
  - Added development scripts (`dev`, `prepublishOnly`)
  - Added `files` field for npm publishing
  - Enhanced metadata
- **Enhanced Index Column Structure**: Two-column index display with "Source" and "Current" sub-headers
  - "Source" column shows original row numbers from the dataset
  - "Current" column shows current display position after filtering/sorting
  - Tooltips explain the purpose of each index column
  - Index column enabled by default (can be disabled with `index={false}`)
- **Improved Tooltips**: Added helpful tooltips throughout the interface
  - Index sub-headers have explanatory tooltips
  - Filter options button has tooltip explaining its purpose
  - Sort buttons retain their multi-sort instruction tooltips
- **CSP Compliance**: Full Content Security Policy support
  - Removed all inline styles from components
  - Styles applied via DOM manipulation or CSS classes
  - Support for CSP nonce attributes in server responses

### Changed
- **Enhanced Row Striping**: Improved visual hierarchy with alternating row colors
  - Even rows now have subtle background shading
  - Better contrast between rows in light/dark modes
  - Enhanced hover effects for better interactivity
- **CSS Architecture**: Complete overhaul with semantic color system
  - Migrated to CSS custom properties for theming
  - Centralized color palette with semantic naming
  - All hardcoded colors replaced with CSS variables
  - Easy theme customization and extension
  - Better maintainability and consistency
- **Numeric Filter UI**: Complete redesign for better usability
  - Vertical layout with separate rows for min/max inputs
  - Real-time validation with error messages
  - Support for negative numbers and decimals
  - Cross-validation between min/max values
  - "Inclusive" checkboxes moved inline with inputs
  - Better visual feedback for invalid states
- **Build System**: Updated Rollup configuration to use new modular structure
  - Changed input from `src/Table.tsx` to `src/index.ts`
  - Updated PostCSS to extract CSS to `css/react-tables.css`
- **Entry Points**: Updated module entry points to use new component structure
- **Project Structure**: Reorganized codebase for better maintainability

### Fixed
- **Null Value Filtering Bug**: Fixed issue where rows with null values were incorrectly filtered out when resetting the table
  - Changed default `omitNonNumeric` setting from `true` to `false` in `initiaDefaultSearch`
  - This ensures null values are preserved unless explicitly filtered out by user
- **NaN Display Issues**: Fixed NaN values appearing in cells after table reset
  - Proper null value handling in valueFunc
  - Validation added for numeric inputs
- **Style Issues**: 
  - Fixed poor contrast of sort buttons against gradient backgrounds
  - Fixed checkbox visibility against gradient headers
  - Fixed filter options button text visibility in dark mode
  - Fixed numeric filter input styling in light mode
- **CSP Violations**: Eliminated all inline style attributes for CSP compliance

### Technical Improvements
- **Code Organization**: Separated concerns into focused, single-responsibility components
- **Type Safety**: Improved TypeScript coverage and type definitions
- **Performance**: Better tree-shaking support with modular exports
- **Maintainability**: Cleaner codebase structure for easier development and debugging

### Migration Guide
If upgrading from 0.3.1:
1. Update CSS import path: `@rare-earth/react-tables/dist/css/react-tables.css`
2. Component imports remain the same: `import { DataTable } from '@rare-earth/react-tables'`
3. No breaking changes to component API

## [0.3.1] - Previous Release
- Initial stable release with monolithic component structure
- Basic table functionality with sorting, filtering, and pagination
- JSX-based implementation