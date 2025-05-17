import { useSortable } from "@dnd-kit/react/sortable";

interface ItemProps {
   key: number | string;
   id: number | string;
   index: number;
   column: number | string;
};

export function Item({ id, index, column }: ItemProps) {
   const { ref, isDragging } = useSortable({
      id,
      index,
      type: 'item',     // optionally restrict which types of items can be sorted together
      accept: 'item',   // optionally restrict which types of items can be dropped on this item
      // optionally assign this item to a group. Items can only be sorted within their group
   });

   return (
      <button className="item" ref={ref} data-dragging={isDragging}>
         {id.toString().substring(0, 4)}
      </button>
   );
}