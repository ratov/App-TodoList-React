import React, { useState } from "react";
import Add from "./components/Add/Add";
import "./style.css";

function App() {

	const [todoArr, setTodoArr] = useState([]);
	const [todo, setTodo] = useState('');

	let date = new Date();
	// let weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
	let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const toDate = (date) => {
		return new Intl.DateTimeFormat('en-En', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		}).format(new Date(date));
	};

	const handlerComplete = (id) => {
		setTodoArr(todoArr.map((item, idx) => {
			if(item.id === id) {
				return {...item, isCompleted: !item.isCompleted}
			} else {
				return item;
			}
		}));
	};

	return (
		<div className="App">
			<div className="todo">
				<div>
					<p>{weekDays[date.getDay()]}</p>
					<p>{toDate(date)}</p>
				</div>

				<Add todo={todo} setTodo={setTodo} setTodoArr={setTodoArr} todoArr={todoArr} />

				<ul className="todo__menu">
					{todoArr.map((item, idx) => {
						return (
							<li className="todo__list" key={item.id}>
								<div className="todo__list-left">
									<input className="todo__list-input" onChange={() => handlerComplete(item.id)} type="checkbox" checked={item.isCompleted} />
									<span className="todo__list-name">{item.name}</span>
								</div>
								<p className="todo__list-option">...</p>
							</li>
						)
					})}
				</ul>

			</div>
		</div>
	);
}

export default App;
