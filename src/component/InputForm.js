import React from 'react';

const InputForm = (props) => {
    
    return (
        <div className="inputForm">
            <div className="row">
                <label>Write To-Do</label>
                <input value={props.inputValue} onChange={props.onChangeInput} onKeyPress={props.onKeyPress} ref={props.inputRef} style={{width: 30 + 'vw'}}/>
                <button className='addList' onClick={props.onClickAdd}>추가</button>
            </div>
            <p>
                <input type="checkbox" checked={props.isDone} onChange={props.onChangeCheck}/>{' '}
                완료된 목록 숨기기
            </p>
        </div>
    );
}

export default InputForm;