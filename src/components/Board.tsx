import { Column } from './Column';
import { Item } from './Item';

export interface BoardProps {
    type: 'main' | 'back';
    orderedItems: { 
        column_ID: string;
        card_IDs: string[];
    }[],
    handleAddItem: (column_ID: string) => void;
}

interface OrderedItem {
    column_ID: string;
    card_IDs: string[];
}

export const Board: React.FC<BoardProps> = ({
    orderedItems,
    handleAddItem,  
    type
}) => {

    return (
        <div className='board'>
            {
                orderedItems.map((item: OrderedItem, column_index: number) => {
                    const { column_ID, card_IDs } = item;
                    return (
                        <Column
                            key={column_ID}
                            id={column_ID}
                            index={column_index}
                            addItem={() => handleAddItem(column_ID)}
                            board_type={ type }
                        >
                            {
                                card_IDs.map((id: string, index: number) => (
                                    <Item key={id} id={id} index={index} column={column_ID} />
                                ))
                            }
                        </Column>
                    )
                })
            }
        </div>
    )
}