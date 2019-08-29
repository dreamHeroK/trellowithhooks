import React, { useState, useEffect } from 'react'
import './Home.css'

const Example = (props) => {
    const [edit, setEdit] = useState(false)
    const [boardList, setBoardList] = useState([])
    const [boardName, setBoardName] = useState('')
    const addBoard = () => {
        if (boardName && boardName.trim() !== '') {
            setEdit(false)
            setBoardList([...boardList, { boardName, boardId: new Date().getTime() }])
            setBoardName('')
        }
    }
    const toBoard = (item, boardIndex) => {
        props.history.push({ pathname: '/Dashboard', state: { item, boardIndex } })
    }
    useEffect(() => {
        const store = JSON.parse(localStorage.getItem('store'))
        if (store) {
            setBoardList(store)
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('store', JSON.stringify(boardList))
    }, [boardList])
    return (
        <div className="buttonContainer">
            {!edit &&
                <div className="addButton" onClick={() => { setEdit(true) }}>
                    <h3 className="addText">   create a dashboard </h3>
                </div>
            }
            {
                edit && <div className="editBoard" >
                    <div className="editTip">creating a board</div>
                    <div className="editContent">
                        <div className="editContentTip">命名你的board</div>
                        <input type="text" value={boardName} onChange={e => { setBoardName(e.target.value) }} />
                        <div className="editButtonContainer">
                            <button onClick={() => setEdit(false)} className="cancelBtn">取消</button>
                            <button onClick={addBoard}>创建</button>
                        </div>
                    </div>
                </div>
            }
            {boardList.map((item, boardIndex) =>
                <div className="boardItem" key={item.boardId} onClick={() => toBoard(item, boardIndex)}>
                    <h2>
                        {item.boardName}
                    </h2>
                </div>
            )}
        </div>
    )
}
export default Example

