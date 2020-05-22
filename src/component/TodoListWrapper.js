import React, {useState, useRef, useEffect} from 'react';
import InputForm from './InputForm';
import TodoList from './TodoList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const TodoListWrapper = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [todoList, setTodoList] = useState(getDaysTodoList(new Date()));
    const [displayFlag, setDisplayFlag] = useState('table-row');
    const [sDate, setSDate] = useState(new Date());
    const inputEl = useRef(null);

    useEffect(() => {
        localStorage.setItem(`data_${getYYYYMMDD(sDate)}`, JSON.stringify(todoList));
    }, [sDate, todoList]);

    const handleClickAdd = () => {
        setTodoList(todoList.concat({
            id: (new Date()).getTime(),
            text: inputValue,
            isDone: false
        }));
        setInputValue('');
        inputEl.current.focus();
    }

    const handleChangeInput = (e) => {
        setInputValue(e.target.value);
    }

    const handleChangeCheck = (e) => {
        setIsDone(e.target.checked);
        if(e.target.checked){
            setDisplayFlag('none');
        } else {
            setDisplayFlag('table-row');
        }
    }

    const handleClickDel = (id) => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleClickAdd();
        }
    }

    const handleToggleDone = (id) => {
        const idx = todoList.findIndex(todo => todo.id === id);
        const afterTodoList = [...todoList];
        afterTodoList[idx] = {...todoList[idx], isDone: !todoList[idx].isDone};
        setTodoList(afterTodoList);
    }

    const handleDateChange = date => {
        setSDate(date);
        setTodoList(getDaysTodoList(date));
    }

    return (
        <div className="row">
            <div className="calendar-area"><Calendar onChange={handleDateChange} value={sDate} /></div>
            <div className="contents-area">
                <InputForm inputValue={inputValue} isDone={isDone} onClickAdd={handleClickAdd} onChangeInput={handleChangeInput} onChangeCheck={handleChangeCheck}
                onKeyPress={handleKeyPress} inputRef={inputEl}/>
                <table className='todoList-table'>
                    <thead>
                        <tr>
                            <td className='title' colSpan='3'><b>To-do List</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <TodoList list={todoList} onClickDel={handleClickDel} onToggleDone={handleToggleDone} displayStyle={displayFlag}/>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const getDaysTodoList = (date) => {
    let todoList = [];
    if(localStorage[`data_${getYYYYMMDD(date)}`]){
        todoList = JSON.parse(localStorage[`data_${getYYYYMMDD(date)}`]);
    }
    return todoList;
}

const getYYYYMMDD = (date) => {
    return `${date.getFullYear()}${(date.getMonth()+1)>=10 ? (date.getMonth()+1) : "0" + (date.getMonth()+1)}${date.getDate()}`;
}

export default TodoListWrapper;