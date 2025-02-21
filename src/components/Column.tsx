import { CollisionPriority } from '@dnd-kit/abstract'
import { useSortable } from "@dnd-kit/react/sortable";

interface ColumnProps {
  addItem: () => void;
  children: React.ReactNode;
  id: string;
  index: number;
};

export function Column({
  addItem,
  children,
  id,
  index
}: ColumnProps) {

  const { ref } = useSortable({
    id,
    index,
    type: 'column',
    collisionPriority: CollisionPriority.Low,
    accept: ['item', 'column']
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