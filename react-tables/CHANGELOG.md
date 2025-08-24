# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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