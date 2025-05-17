import { useEffect, useRef, useState } from 'react';
import './App.css';

import { Board } from './components/Board';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';

interface Items {
  [column_ID: string]: string[];
}

export type BoardMap ={
  [key in 'main' | 'back']: string[]
}

function App() {
  const [columnOrderMap, setColumnOrderMap] = useState<BoardMap>({
    main: ["A", "B", "C"],
    back: ["D", "E", "F"]
  });

  const [itemOrderMap, setItemOrderMap] = useState<Items>({
    A: ["1", "2", "3"],
    B: ["4", "5"],
    C: ["6"],
    D: ["7", "8"],
    E: ["9"],
    F: []
  });
  
  const previousItems = useRef(itemOrderMap);

  // adds a draggable item to the specified column
  function handleAddItem(containerID: string | number) {
    const id = crypto.randomUUID();

    setItemOrderMap(prev => {
      const newItems = Array.from(prev[containerID]);
      newItems.push(id);

      return {
        ...prev,
        [containerID]: newItems
      }
    });
  };

  // at the start of a draggable element, store the current items, in case the drag is cancelled
  function handleDragStart() {

  }

  // only if dragging an item, do they need to be set within an empty column
  function handleDragOver(event: any) {
    const { source, target } = event.operation;

    // Log the type of the source and target
    console.log('DragOver:', {
      sourceType: source?.type,
      sourceId: source?.id,
      targetType: target?.type,
      targetId: target?.id,
    });

    if (source?.type?.includes('column')){
      setColumnOrderMap(prev => move(prev, event));
      return;
    };

    setItemOrderMap(prev => move(prev, event))
  }

  // function handleDragEnd(event: any) {
  //   const { source } = event.operation;

  //   if (event.canceled) {
  //     if (source.type !== 'item') setItems(previousItems.current);

  //     return;
  //   }

  //   if (source.type === 'column') setColumnOrder(prev => move(prev, event));
  // }

  useEffect(() => {
const id = setTimeout(() => {
  console.log('columnOrderMap', columnOrderMap);
  console.log('itemOrderMap', itemOrderMap);
}, 500);

return () => {
  clearTimeout(id);}
  },[columnOrderMap, itemOrderMap]);

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      // onDragEnd={handleDragEnd}
    >
      <Board
        orderedItems={Object.values(columnOrderMap.main).map((column_ID) => {
          const items = itemOrderMap[column_ID];
          return {
            column_ID,
            card_IDs: items
          }
        })}
        handleAddItem={handleAddItem}
        type="main"
      />
      <Board
        orderedItems={Object.values(columnOrderMap.back).map((column_ID) => {
          const items = itemOrderMap[column_ID];
          return {
            column_ID,
            card_IDs: items
          }
        })}
        handleAddItem={handleAddItem}
        type="back"
      />
    </DragDropProvider>
  )
}

export default App
