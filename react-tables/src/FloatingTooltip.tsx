import React from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react';

interface FloatingTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const FloatingTooltip: React.FC<FloatingTooltipProps> = ({ children, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift({ padding: 5 })],
    whileElementsMounted: autoUpdate,
    placement: 'top'
  });

  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ]);

  // Apply styles directly to the DOM element to avoid inline styles
  React.useEffect(() => {
    if (isOpen && refs.floating.current) {
      const element = refs.floating.current;
      element.style.position = floatingStyles.position as string;
      element.style.top = `${floatingStyles.top ?? 0}px`;
      element.style.left = `${floatingStyles.left ?? 0}px`;
      element.style.transform = floatingStyles.transform as string;
    }
  }, [isOpen, floatingStyles, refs.floating]);

  return (
    <>
      <div
        ref={refs.setReference}
        className="rare-earth-floating-tooltip-wrapper"
        {...getReferenceProps()}
      >
        {children}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          className="rare-earth-floating-tooltip"
          {...getFloatingProps()}
        >
          {content}
        </div>
      )}
    </>
  );
};

export { FloatingTooltip };