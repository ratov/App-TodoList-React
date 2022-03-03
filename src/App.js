import React, { useState } from "react";
import Add from "./components/Add/Add";
import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faThumbTack, faStickyNote, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
			if (item.id === id) {
				return { ...item, isCompleted: !item.isCompleted }
			} else {
				return item;
			}
		}));
	};

	const handlerOption = (id) => {
		setTodoArr(todoArr.map((item) => {
			if (item.id === id) {
				return { ...item, option: !item.option }
			} else {
				return item;
			}
		}));
	};

	const handlerDelete = (id) => {
		setTodoArr(todoArr.filter((item) => {
			return item.id !== id;
		}));
	};

	const handlerEdit = (id) => {
		setTodoArr(todoArr.map((item) => {
			if (item.id === id) {
				return { ...item, isChange: !item.isChange }
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
									<div className="todo__list-text">
										{item.isChange
											? <textarea maxLength={30} className="todo__list-textarea" onChange={(e) => {
												item.name = e.target.value
											}}>{item.name}</textarea>
											: <span className="todo__list-name">{item.name}</span>}
											<span className="todo__list-memo">{item.memo}</span>
									</div>
								</div>
								<p className="todo__list-option" onClick={() => handlerOption(item.id)}>...</p>
								<ul className={`todo__list-options ${item.option ? 'active' : ''}`}>
									<li className="todo__list-options-item">
										<FontAwesomeIcon icon={faThumbTack} />
										Pin on the top
									</li>
									<li className="todo__list-options-item">
										<FontAwesomeIcon icon={faStickyNote} />
										Add a menu
									</li>
									<li className="todo__list-options-item" onClick={() => handlerEdit(item.id)}>
										<FontAwesomeIcon icon={faEdit} />
										{
											item.isChange ? 'Save' : 'Edit'
										}

									</li>
									<li className="todo__list-options-item" onClick={() => handlerDelete(item.id)}>
										<FontAwesomeIcon icon={faTrashAlt} />
										Delete
									</li>
								</ul>
							</li>
						)
					})}
				</ul>

			</div>
		</div>
	);
}

export default App;
