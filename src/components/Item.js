import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
import './Item.css'

const notFinishedStyle = { opacity: 1, textDecoration: 'none', backgroundColor: 'rgb(202, 255, 222)', }
const finishedStyle = { opacity: 0.35, textDecoration: 'line-through', backgroundColor: 'rgb(222, 202, 255)' }
const Item = ({ it, i, index }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, it, i, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })
    return (
        <div ref={drag} className="itemContainer" style={it.finish ? finishedStyle : notFinishedStyle}>
            {it.name}
        </div>
    )
}
export default Item
