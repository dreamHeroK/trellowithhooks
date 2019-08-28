import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Item from './Item'

const List = ({ item, index, addTodo, setTodoName, moveCard,changeStatus }) => {
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        drop(item, monitor) {
            const dragIndex = item.index
            const dragI = item.i
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            moveCard(dragIndex, dragI, hoverIndex)
            item.index = hoverIndex
        },
    })
    return (
        <div ref={drop}>
            <div className="ListItemContent">
                <h4 className="listName">
                    {item.name}
                </h4>
                <hr />
                <input onKeyPress={e => addTodo(index, e)} value={item.todoName} onChange={e => setTodoName(index, e)} />
                {item.todoList && item.todoList.map((it, i) => <Item className="todoItem" key={it.id} it={it} i={i} index={index} changeStatus={changeStatus}/>
                )}
            </div>
        </div>
    )
}
// export default DropTarget(Types.List, ListTarget, collect)(List)
export default List