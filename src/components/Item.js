import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

const itemSource = {
    canDrag(props) {
        // You can disallow drag based on props
        return props.isReady
    },

    isDragging(props, monitor) {
        // If your component gets unmounted while dragged
        // (like a card in Kanban board dragged between lists)
        // you can implement something like this to keep its
        // appearance dragged:
        return monitor.getItem().id === props.id
    },

    beginDrag(props, monitor, component) {
        // Return the data describing the dragged item
        const item = { id: props.id }
        return item
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            // You can check whether the drop was successful
            // or if the drag ended but nobody handled the drop
            return
        }

        // When dropped on a compatible target, do something.
        // Read the original dragged item from getItem():
        const item = monitor.getItem()

        // You may also read the drop result from the drop target
        // that handled the drop, if it returned an object from
        // its drop() method.
        const dropResult = monitor.getDropResult()

        // This is a good place to call some Flux action
        // CardActions.moveCardToList(item.id, dropResult.listId)
    },
}
function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging(),
    }
}
class Item extends Component {
    render() {
        const { it } = this.props
        return (
            <div>
                {it.name}
            </div>
        )
    }
}
export default DragSource('item',itemSource, collect)(Item)
