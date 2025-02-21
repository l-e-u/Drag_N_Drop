import { useRef, useState } from 'react';
import './App.css';

import { Column } from './components/Column';
import { Item } from './components/Item';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

interface Items {
  [key: string]: string[];
}

function App() {
  const [items, setItems] = useState<Items>({
    A: [],
    B: [],
    C: []
  });

  const previousItems = useRef(items);
  const [columnOrder, setColumnOrder] = useState(() => Object.keys(items));

  // adds a draggable item to the specified column
  function handleAddItem(containerID: string | number) {
    const id = crypto.randomUUID();

    setItems(prev => ({
      ...prev,
      [containerID]: [
        ...prev[containerID],
        id
      ]
    }))
  };

  // at the start of a draggable element, store the current items, in case the drag is cancelled
  function handleDragStart() {
    previousItems.current = items;
  }

  // only if dragging an item, do they need to be set within an empty column
  function handleDragOver(event: any) {
    const { source } = event.operation;

    if (source?.type === 'column') return;

    setItems(prev => move(prev, event))
  }

  function handleDragEnd(event: any) {
    const { source } = event.operation;

    if (event.canceled) {
      if (source.type !== 'item') setItems(previousItems.current);

      return;
    }

    if (source.type === 'column') setColumnOrder(prev => move(prev, event));
  }

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className='board'>
        {
          Object.entries(items).map(([column, items], columnIndex) => {
            return (
              <Column
                key={column}
                id={column}
                index={columnIndex}
                addItem={() => handleAddItem(column)}
              >
                {
                  items.map((id, index) => (
                    <Item key={id} id={id} index={index} column={column} />
                  ))
                }
              </Column>
            )
          })}
      </div>
    </DragDropProvider>
  )
}

export default App
