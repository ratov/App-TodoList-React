import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
// import BIRDS from "vanta/dist/vanta.birds.min";
import NET from "vanta/dist/vanta.net.min";
import Add from "./components/Add/Add";
import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faThumbTack, faStickyNote, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function App() {

	const [todoArr, setTodoArr] = useState([]);
	const [todo, setTodo] = useState('');
	const [status, setStatus] = useState('all');

	const [vantaEffect, setVantaEffect] = useState(0);
	const myRef = useRef(null)
	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(NET({
				el: myRef.current,
				THREE: THREE,
				color: 0xa914be,
				backgroundColor: 0x111111,
				points: 14.00,
				maxDistance: 32.00,
				spacing: 14.00
			}))
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy()
		}
	}, [vantaEffect]);

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
				return { ...item, option: false };
			}
		}));
	};

	const handlerOption = (id) => {
		setTodoArr(todoArr.map((item) => {
			if (item.id === id) {
				return { ...item, option: !item.option, addMemo: false, isChange: false }
			} else {
				return { ...item, option: false }
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
				return { ...item, isChange: !item.isChange, addMemo: false }
			} else {
				return item;
			}
		}));
	};

	const handlerMemo = (id) => {
		setTodoArr(todoArr.map((item, idx) => {
			if (item.id === id) {
				return { ...item, addMemo: !item.addMemo, isChange: false }
			} else {
				return item;
			}
		}))
	};

	const handlerPin = (id) => {
		setTodoArr(todoArr.map((item, idx) => {
			if (item.id === id) {
				return { ...item, pin: !item.pin, option: false }
			} else {
				return item;
			}
		}))
	};

	const last = todoArr.length !== 0 ? todoArr.filter((item) => item.pin).reduce((acc, rec) => {
		return rec
	}, {}) : '';

	return (
		<>
			<div className="vanta" ref={myRef}>

			</div>
			<div className="App">
				<div className="todo">
					<div>
						<p>{weekDays[date.getDay()]}</p>
						<p>{toDate(date)}</p>
					</div>

					<Add status={status} setStatus={setStatus} todo={todo} setTodo={setTodo} setTodoArr={setTodoArr} todoArr={todoArr} />

					<ul className="todo__menu">
						{todoArr.filter((item, idx) => {
							if (status === 'active') {
								return !item.isCompleted;
							} else if (status === 'completed') {
								return item.isCompleted;
							} else {
								return item;
							}
						}).map((item, idx, array) => {
							return (
								<li
									id={last.id === item.id ? 'last' : ''}
									className={`todo__list ${item.pin ? 'pin' : ''}`}
									key={item.id}>
									{
										item.pin
											? <span className="todo__list-pin"><FontAwesomeIcon icon={faThumbTack} /></span>
											: ''
									}
									<div className="todo__list-left">
										<input className="todo__list-input" onChange={() => handlerComplete(item.id)} type="checkbox" checked={item.isCompleted} />
										<div className="todo__list-text">
											{item.isChange
												? <textarea id='changeName' defaultValue={item.name} maxLength={30} className="todo__list-textarea" onChange={(e) => {
													item.name = e.target.value
												}}></textarea>
												: <span className={`todo__list-name ${item.isCompleted ? 'complete' : ''}`}>{item.name}</span>}

											{
												item.addMemo
													? <textarea className="todo__list-memo-textarea" id='changeMemo' defaultValue={item.memo} onChange={(e) => item.memo = e.target.value}></textarea>
													: <span className="todo__list-memo">{item.memo}</span>
											}
										</div>
									</div>
									<p className="todo__list-option" onClick={() => handlerOption(item.id)}>...</p>
									<ul className={`todo__list-options ${item.option ? 'active' : ''}`}>
										<li className="todo__list-options-item" onClick={() => handlerPin(item.id)}>
											<FontAwesomeIcon icon={faThumbTack} />
											{
												item.pin
													? 'Unpin'
													: 'Pin on the top'
											}
										</li>
										<li className="todo__list-options-item" onClick={() => handlerMemo(item.id)}>
											<FontAwesomeIcon icon={faStickyNote} />
											{
												item.addMemo
													? 'Save'
													: item.memo.length !== 0
														? 'Edit momo'
														: 'Add a memo'
											}
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
		</>

	);
}

export default App;
