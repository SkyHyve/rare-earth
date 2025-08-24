import React from 'react';

interface PaginationProps {
  value: number;
  onChange: (value: number) => void;
  total: number;
}

const Pagination = React.memo<PaginationProps>(({ value, onChange, total }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, value - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(
        <button 
          key={1} 
          className="rare-earth-page-button" 
          onClick={() => onChange(1)}
          aria-label="Go to page 1"
          type="button"
        >
          1
        </button>
      );
      if (start > 2) {
        pages.push(<span key="dots1" className="rare-earth-pagination-dots">...</span>);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`rare-earth-page-button ${i === value ? 'active' : ''}`}
          onClick={() => onChange(i)}
          aria-label={`Go to page ${i}`}
          aria-current={i === value ? 'page' : undefined}
          type="button"
        >
          {i}
        </button>
      );
    }

    if (end < total) {
      if (end < total - 1) {
        pages.push(<span key="dots2" className="rare-earth-pagination-dots">...</span>);
      }
      pages.push(
        <button 
          key={total} 
          className="rare-earth-page-button" 
          onClick={() => onChange(total)}
          aria-label={`Go to page ${total}`}
          type="button"
        >
          {total}
        </button>
      );
    }

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
      >
        ›
      </button>
    </nav>
  );
});

export { Pagination };