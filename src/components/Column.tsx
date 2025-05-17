import { CollisionPriority } from '@dnd-kit/abstract'
import { useSortable } from "@dnd-kit/react/sortable";
import { BoardProps } from './Board';

interface ColumnProps {
  addItem: () => void;
  children: React.ReactNode;
  id: string;
  index: number;
  board_type: BoardProps['type'];
};

export function Column({
  addItem,
  children,
  id,
  index,
  board_type
}: ColumnProps) {

  const column_type = `${board_type}-column`;

  const { ref } = useSortable({
    id,
    index,
    type: column_type, // optionally restrict which types of items can be sorted together
    collisionPriority: CollisionPriority.Low,
    accept: ['item', column_type], // optionally restrict which types of items can be dropped on this item
  })

  return (
    <div className="column" ref={ref}>
      <p>{id}</p>
      <ul>
        {children}
      </ul>
      <button onClick={addItem}>+</button>
    </div >
  );
}