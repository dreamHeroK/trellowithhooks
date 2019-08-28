import React, { Component } from 'react'
import Item from './Item'

export default class Test extends Component {
    render() {
        const { item, index, addTodo, setTodoName } = this.props
        console.log(item,'item')
        return (
            <div>
                <div className="ListItemContent">
                    <h4 className="listName">
                        {item.name}
                    </h4>
                    <hr />
                    <input onKeyPress={e => addTodo(index, e)} value={item.todoName} onChange={e => setTodoName(index, e)} />
                    {item.todoList && item.todoList.map((it, i) => <Item className="todoItem" key={it.id} it={it}/>
                    )}
                </div>
            </div>
        )
    }
}
