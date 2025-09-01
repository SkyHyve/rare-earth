# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.2] - 2025-01-31

### Fixed
- **Event Handler Consistency**: Fixed all checkbox onChange handlers to use `event.target.checked` consistently
  - Previously some handlers used `event.currentTarget.checked` which could cause issues
  - Affects numeric filter inclusive checkboxes and all filter option checkboxes

### Changed
- **Filter Controls Styling**: Introduced dedicated `rare-earth-filter-controls` CSS class
  - Replaced generic `rare-earth-flex-xs` with semantic class name for filter controls section
  - Maintains same visual appearance with improved code organization
  - Gap reduced from 0.25rem to 2px for tighter spacing

## [0.5.1] - 2025-01-31

### Added
- **Export All Tables to Excel**: New functionality to export all database tables to a single Excel file
  - Each table exported as a separate sheet in the workbook
  - Auto-sized columns based on content
  - Cyan/teal themed button matching the design system
  - Tooltip explaining functionality
  - Proper ARIA labeling for accessibility

### Changed
- **Type Toggle Behavior**: Type toggle buttons (Text/Numeric) now disable instead of hide when `typeToggleable` is false
  - Buttons remain visible but with reduced opacity
  - Cursor shows "not-allowed" when disabled
  - Click events are properly blocked when disabled

- **Reduced Vertical Spacing**: Significantly compressed UI elements for more compact interface
  - Database tabs padding: 8px → 2px
  - Tab button padding: 8px 16px → 2px 8px
  - Control container padding: 0.5rem → 0.25rem
  - Table header/cell padding: 0.25rem → 0.125rem 0.25rem
  - Button padding reduced across all elements
  - Control gaps reduced from 0.5rem → 0.125rem

- **Class Name Improvements**: Renamed CSS classes for better semantic meaning
  - `rare-earth-stack` → `rare-earth-filter-content`
  - `rare-earth-stack-sm` → `rare-earth-filter-content-sm`
  - Removed gap from filter content containers

## [0.5.0] - 2025-01-30

### Added
- **Database Component**: New multi-table interface for complex data analysis
  - Query multiple tables with SQL joins, aggregations, and filtering
  - Interactive SQL query builder with schema browsing
  - Dynamic table creation from SQL query results
  - Table management with rename and delete capabilities
  - Real-time SQL validation and error reporting
  - Collapsible schema browser showing all available tables and columns

- **SQL Engine Integration**: Client-side SQL processing capabilities
  - Pure JavaScript SQL engine for CSP compliance
  - Support for SELECT, JOIN, WHERE, GROUP BY, ORDER BY, and aggregate functions
  - Real-time query execution without server dependencies
  - Table registration and data synchronization
  - SQL identifier validation for security

- **Comprehensive Accessibility Support**: WCAG 2.1 AA compliant implementation
  - Full ARIA attribute coverage (roles, labels, live regions, descriptions)
  - Keyboard navigation with focus trapping and management
  - Screen reader optimizations with sr-only content
  - Tab panel and dialog accessibility patterns
  - Enhanced focus indicators and keyboard shortcuts

- **Responsive Modal Design**: Adaptive modal sizing for different screen sizes
  - Mobile: 90% width, max 500px
  - Tablet: 80% width, max 600px  
  - Desktop: 70% width, max 700px
  - Large Desktop: 60% width, max 800px
  - Extra Large: 50% width, max 900px

### Enhanced
- **Dark Mode Improvements**: Significantly enhanced dark theme visual design
  - Improved contrast ratios for better accessibility
  - Enhanced hover states with smooth transitions and micro-animations
  - Better focus indicators with blue outline rings
  - Improved button styling with subtle backgrounds and shadows
  - Enhanced interactive feedback for all clickable elements
  - Slower, more deliberate transitions (0.8s) for schema toggle animations

- **User Interface Polish**: Multiple visual and interaction improvements
  - Enhanced tab hover effects with lift animations
  - Improved action button micro-interactions with scale effects
  - Better error state styling with semi-transparent backgrounds
  - Enhanced form input focus states with glow effects
  - Smoother transitions throughout the interface

### Breaking Changes
- **Replaced `className` prop with `darkMode` boolean prop**
  - Removed the `className` prop from DataTable component
  - Added `darkMode` boolean prop for enabling dark mode styling
  - Dark mode is now controlled via `darkMode={true}` instead of `className="dark-mode"`

### Technical Improvements
- **Code Cleanup**: Removed unused database state management
- **Type Safety**: Fixed TypeScript warnings and improved type coverage
- **Performance**: Optimized component re-renders and state management

## [0.4.5] - 2025-01-26

### Accessibility Improvements
- **Enhanced Screen Reader Support for Sort Buttons**
  - Added comprehensive `aria-label` descriptions including current sort state and available actions
  - Added `aria-live` regions with screen reader-only text to announce sort changes
  - Improved labeling to indicate sort priority in multi-column sorting
  - Clear instructions for keyboard interaction (Shift+Click for multi-sort)

- **Improved ARIA Roles and Semantics**
  - Changed draggable column headers from `role="button"` to `role="columnheader"` for better semantic meaning
  - Added `scope="col"` to table header cells for proper column association
  - Enhanced filter button labels with context about current filter type

- **Visual Focus Indicators**
  - Added visible focus outlines for all interactive elements (sort buttons, filter buttons, draggable headers)
  - Implemented `:focus-visible` for keyboard-only focus indicators
  - Added high-contrast cyan focus rings (2px solid) with proper offset
  - Ensures all interactive elements are clearly identifiable when navigating via keyboard

- **Screen Reader Announcements**
  - Sort state changes are now announced via `aria-live="polite"` regions
  - Hidden visual sort indicators (triangles) properly marked with `aria-hidden="true"`
  - Added screen reader-only text class (.sr-only) for additional context

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