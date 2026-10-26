import React from 'react';

interface ColumnDragHandleProps {
  tableId: string;
  columnKey: string;
  columnIndex: number;
  columnOrder: string[];
  onOrderChange: (order: string[]) => void;
  headerRefs?: React.RefObject<Record<number, HTMLDivElement>>;
  children: React.ReactNode;
}

const ColumnDragHandle = function({
  tableId,
  columnKey,
  columnIndex,
  columnOrder,
  onOrderChange,
  headerRefs,
  children,
}: ColumnDragHandleProps){
  const onDragStart = React.useCallback((event: React.DragEvent) => {
    event.dataTransfer.setData('initiatorKey', columnKey);
    event.dataTransfer.setData('initiatorIndex', columnIndex.toString());
  }, [columnKey, columnIndex]);

  const onDrop = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const columnA = event.dataTransfer.getData('initiatorKey');
    const indexA = parseInt(event.dataTransfer.getData('initiatorIndex'));
    if (columnA === columnKey || !columnOrder.includes(columnA) || !Number.isInteger(indexA)){
      return;
    }

    const boundingBox = event.currentTarget.getBoundingClientRect();
    const before = event.clientX <= ((boundingBox.left + boundingBox.right) / 2);
    const newColumnOrder: string[] = [];
    for (let i = 0; i < columnOrder.length; i++){
      const orderColumnKey = columnOrder[i];
      if (orderColumnKey !== columnA && orderColumnKey !== columnKey){
        newColumnOrder.push(orderColumnKey);
      } else if (orderColumnKey === columnKey){
        if (Math.abs(i - indexA) <= 1){
          newColumnOrder.push(...(indexA < i ? [columnKey, columnA] : [columnA, columnKey]));
        } else {
          newColumnOrder.push(...(before ? [columnA, columnKey] : [columnKey, columnA]));
        }
      }
    }
    onOrderChange(newColumnOrder);
  }, [columnKey, columnOrder, onOrderChange]);

  return(
    <div
      ref={(element) => {
        if (element && headerRefs?.current){
          headerRefs.current[columnIndex] = element;
        }
      }}
      data-rare-earth-column-key={columnKey}
      className="rare-earth-draggable"
      draggable={true}
      data-testid={`column-header-${tableId}-${columnKey}`}
      data-column={columnKey}
      data-draggable="true"
      onDragStart={onDragStart}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
};

export { ColumnDragHandle };
