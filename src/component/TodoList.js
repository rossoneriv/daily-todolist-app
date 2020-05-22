import React, {memo} from 'react';

const TodoList = memo((props) => {

    const todoList = props.list.length>0?props.list.map( (todo) => (
        <tr key={todo.id} onClick={() => props.onToggleDone(todo.id)} style={{display: todo.isDone? props.displayStyle : 'table-row'}}>
            <td style={{textDecoration: todo.isDone? 'line-through' : 'none'}}>{todo.text}</td>
            <td className='isDoneCheck'>{todo.isDone && (<>&#x2713;</>)}</td>
            <td className='delCol'><button className='delList' onClick={(e) => {
                    e.stopPropagation();
                    props.onClickDel(todo.id)}
            }>삭제</button></td>
        </tr>
    )) : <tr></tr>;

    return (
        <>
            {todoList}
        </>
    );
});

export default TodoList;