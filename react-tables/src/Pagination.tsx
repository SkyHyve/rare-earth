import React from 'react';

interface PaginationProps {
  tableId: string;
  value: number;
  onChange: (value: number) => void;
  total: number;
}

const Pagination = React.memo<PaginationProps>(({ tableId, value, onChange, total }) => {
  const renderPageNumbers = () => {
    const pages = [];
    
    // If only 1 page, just show it
    if (total === 1) {
      pages.push(
        <button 
          key={1} 
          className="rare-earth-page-button active"
          onClick={() => onChange(1)}
          aria-label="Go to page 1"
          aria-setsize={total}
          aria-posinset={1}
          type="button"
          data-testid={`pagination-page-1-${tableId}`}
        >
          1
        </button>
      );
      return pages;
    }
    
    // For 7 or fewer pages, show all of them
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(
          <button
            key={i}
            className={`rare-earth-page-button ${i === value ? 'active' : ''}`}
            onClick={() => onChange(i)}
            aria-label={`Go to page ${i}`}
            aria-current={i === value ? 'page' : undefined}
            aria-setsize={total}
            aria-posinset={i}
            type="button"
            data-testid={`pagination-page-${i}-${tableId}`}
          >
            {i}
          </button>
        );
      }
      return pages;
    }

    // For more than 7 pages, we always show exactly 7 slots
    // Pattern: [1] [2 or ...] [x] [current] [y] [... or n-1] [n]
    
    // Always slot 1: first page
    pages.push(
      <button 
        key={1} 
        className={`rare-earth-page-button ${1 === value ? 'active' : ''}`}
        onClick={() => onChange(1)}
        aria-label="Go to page 1"
        aria-setsize={total}
        aria-posinset={1}
        type="button"
        data-testid={`pagination-page-1-${tableId}`}
      >
        1
      </button>
    );

    // Determine what goes in slots 2-6
    if (value <= 4) {
      // Near start: [1] [2] [3] [4] [5] [...] [n]
      for (let i = 2; i <= 5; i++) {
        pages.push(
          <button
            key={i}
            className={`rare-earth-page-button ${i === value ? 'active' : ''}`}
            onClick={() => onChange(i)}
            aria-label={`Go to page ${i}`}
            aria-current={i === value ? 'page' : undefined}
            aria-setsize={total}
            aria-posinset={i}
            type="button"
            data-testid={`pagination-page-${i}-${tableId}`}
          >
            {i}
          </button>
        );
      }
      pages.push(<span key="dots2" className="rare-earth-pagination-dots">...</span>);
    } else if (value >= total - 3) {
      // Near end: [1] [...] [n-4] [n-3] [n-2] [n-1] [n]
      pages.push(<span key="dots1" className="rare-earth-pagination-dots">...</span>);
      for (let i = total - 4; i <= total - 1; i++) {
        pages.push(
          <button
            key={i}
            className={`rare-earth-page-button ${i === value ? 'active' : ''}`}
            onClick={() => onChange(i)}
            aria-label={`Go to page ${i}`}
            aria-current={i === value ? 'page' : undefined}
            aria-setsize={total}
            aria-posinset={i}
            type="button"
            data-testid={`pagination-page-${i}-${tableId}`}
          >
            {i}
          </button>
        );
      }
    } else {
      // In middle: [1] [...] [current-1] [current] [current+1] [...] [n]
      pages.push(<span key="dots1" className="rare-earth-pagination-dots">...</span>);
      for (let i = value - 1; i <= value + 1; i++) {
        pages.push(
          <button
            key={i}
            className={`rare-earth-page-button ${i === value ? 'active' : ''}`}
            onClick={() => onChange(i)}
            aria-label={`Go to page ${i}`}
            aria-current={i === value ? 'page' : undefined}
            aria-setsize={total}
            aria-posinset={i}
            type="button"
            data-testid={`pagination-page-${i}-${tableId}`}
          >
            {i}
          </button>
        );
      }
      pages.push(<span key="dots2" className="rare-earth-pagination-dots">...</span>);
    }

    // Always slot 7: last page
    pages.push(
      <button 
        key={total} 
        className={`rare-earth-page-button ${total === value ? 'active' : ''}`}
        onClick={() => onChange(total)}
        aria-label={`Go to page ${total}`}
        aria-setsize={total}
        aria-posinset={total}
        type="button"
        data-testid={`pagination-page-${total}-${tableId}`}
      >
        {total}
      </button>
    );

    return pages;
  };

  return (
    <nav className="rare-earth-pagination" role="navigation" aria-label="Table pagination">
      <button
        className="rare-earth-page-button"
        disabled={value === 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        aria-label="Go to previous page"
        type="button"
        data-testid={`pagination-previous-${tableId}`}
        data-action="previous"
        title="Go to previous page"
      >
        ‹
      </button>
      {renderPageNumbers()}
      <button
        className="rare-earth-page-button"
        disabled={value === total}
        onClick={() => onChange(Math.min(total, value + 1))}
        aria-label="Go to next page"
        type="button"
        data-testid={`pagination-next-${tableId}`}
        data-action="next"
        title="Go to next page"
      >
        ›
      </button>
    </nav>
  );
});

export { Pagination };