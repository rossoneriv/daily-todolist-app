import React from 'react';
import TodoListWrapper from './component/TodoListWrapper';
import './css/style.css';

function App() {

  	return (
		<div className="todoList-wrapper">
      		<div className="head-title"><h1>Daily To-Do List</h1></div><hr></hr>
			<TodoListWrapper/>
		</div>
  	);
}

export default App;
