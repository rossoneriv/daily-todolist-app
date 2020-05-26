import React, {useRef, useEffect, useReducer} from 'react';
import InputForm from './InputForm';
import TodoList from './TodoList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CLICK_ADD = 'clickAdd';
const CHANGE_INPUT = 'changeInput';
const CHANGE_CHECK = 'changeCheck';
const CLICK_DEL = 'clickDel';
const TOGGLE_DONE = 'toggleDone';
const CHANGE_DATE = 'changeDate';

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

const initialState = {
    inputValue: '',
    isDone: false,
    todoList: getDaysTodoList(new Date()),
    displayFlag: 'table-row',
    sDate: new Date()
}

const reducer = (state, action) => {
    switch(action.type) {
        case CLICK_ADD : {
            return {...state, 
                todoList: state.todoList.concat({
                    id: action.payload,
                    text: state.inputValue,
                    isDone: false
                }),
                inputValue: ''
            }
        }
        case CHANGE_INPUT : {
            return {...state, inputValue: action.payload}
        }
        case CHANGE_CHECK : {
            return {...state, isDone: action.payload, displayFlag: action.payload ? 'none' : 'table-row'}
        }
        case CLICK_DEL : {
            return {...state, todoList: state.todoList.filter(todo => todo.id !== action.payload)}
        }
        case TOGGLE_DONE : {
            return {...state, 
                todoList: state.todoList.map(todo => todo.id === action.payload ? {...todo, isDone: !todo.isDone} : todo)}
        }
        case CHANGE_DATE : {
            return {...state, sDate: action.payload.sDate, todoList: action.payload.todoList}
        }
        default : return state;
    }
}

const TodoListWrapper = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const inputEl = useRef(null);
    
    useEffect(() => {
        localStorage.setItem(`data_${getYYYYMMDD(state.sDate)}`, JSON.stringify(state.todoList));
    }, [state.sDate, state.todoList]);

    const handleClickAdd = () => {
        dispatch({ type: CLICK_ADD, payload: (new Date()).getTime() });
        inputEl.current.focus();
    }

    const handleChangeInput = (e) => {
        dispatch({ type: CHANGE_INPUT, payload: e.target.value });
    }

    const handleChangeCheck = (e) => {
        dispatch({ type: CHANGE_CHECK, payload: e.target.checked });
    }

    const handleClickDel = (id) => {
        dispatch({ type: CLICK_DEL, payload: id });
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleClickAdd();
        }
    }

    const handleToggleDone = (id) => {
        dispatch({ type: TOGGLE_DONE, payload: id });
    }

    const handleDateChange = date => {
        dispatch({ type: CHANGE_DATE, payload: {sDate: date, todoList: getDaysTodoList(date)} });
    }

    return (
        <div className="row">
            <div className="calendar-area"><Calendar onChange={handleDateChange} value={state.sDate} /></div>
            <div className="contents-area">
                <InputForm inputValue={state.inputValue} isDone={state.isDone} onClickAdd={handleClickAdd} onChangeInput={handleChangeInput} onChangeCheck={handleChangeCheck}
                onKeyPress={handleKeyPress} inputRef={inputEl}/>
                <table className='todoList-table'>
                    <thead>
                        <tr>
                            <td className='title' colSpan='3'><b>To-do List</b></td>
                        </tr>
                    </thead>
                    <tbody>
                        <TodoList list={state.todoList} onClickDel={handleClickDel} onToggleDone={handleToggleDone} displayStyle={state.displayFlag}/>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TodoListWrapper;