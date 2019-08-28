import React, { useState, useEffect, useCallback } from 'react'
import List from './components/List'
import './Dashboard.css'

const Dashboard = (props) => {
    const [border, setBorder] = useState({})
    const [listName, setListName] = useState('')

    useEffect(() => {
        const { state } = props.location;
        const store = localStorage.getItem('store')
        if (state) {
            setBorder(state)
        }
    }, [props.location])

    const addList = e => {
        if (listName.trim !== '') {
            if (e.nativeEvent.keyCode === 13) {
                setBorder({
                    ...border, list: [...border.list || [], { name: listName, id: new Date().getTime(), todoName: '' }],
                })
                setListName('')
            }
        }
    }
    const setTodoName = (i, e) => {
        const { list } = border
        list[i].todoName = e.target.value;
        setBorder({ ...border, list })
    }

    const addTodo = (i, e) => {
        const value = e.target.value
        if (value && value.trim() !== '') {
            if (e.nativeEvent.keyCode === 13) {
                const { list } = border
                if (!list[i].todoList) {
                    list[i].todoList = []
                }
                list[i].todoList.push({
                    name: value,
                    id: new Date().getTime(),
                    finshed: false
                })
                list[i].todoName = ''
                setBorder({ ...border, list })
            }
        }
    }
    const showEdit = () => {
        setBorder({ ...border, edit: true })
    }
    const moveCard = useCallback((dragIndex, dragI, hoverIndex) => {
        const dragCard = border.list[dragIndex].todoList[dragI]
        border.list[dragIndex].todoList.splice(dragI, 1)
        if (!border.list[hoverIndex].todoList) {
            border.list[hoverIndex].todoList = []
        }
        border.list[hoverIndex].todoList.push(dragCard)
        setBorder({ ...border })
    },
        [border])
    return (
        <div>
            <div className="boardName">
                <h2 className="boardNameText">{border.boardName}</h2>
            </div>
            <div className="listContent">
                <div>
                    {border.list && border.list.map((item, index) =>
                        <List key={item.id} className="listItem" item={item} index={index} addTodo={addTodo} setTodoName={setTodoName} moveCard={moveCard} />
                    )}
                    {!border.edit &&
                        <div className="addBtn" onClick={showEdit}>
                            ADD A LIST
                                </div>
                    }
                    {
                        border.edit &&
                        <div className="editBtn">
                            <div className="delete">x</div>
                            <input onKeyPress={e => addList(e)} value={listName} onChange={e => setListName(e.target.value)} />
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}
export default Dashboard