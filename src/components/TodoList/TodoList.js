import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack, faStickyNote, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TodoList = ({ todoArr, setTodoArr, status }) => {

	const handlerOption = (id) => {
		setTodoArr(todoArr.map(item => item.id === id
			? { ...item, option: !item.option, addMemo: false, isChange: false }
			: { ...item, option: false }
		));
	};

	const handlerComplete = (id) => {
		setTodoArr(todoArr.map(item => item.id === id
			? { ...item, isCompleted: !item.isCompleted }
			: { ...item, option: false }
		));
	};

	const handlerPin = (id) => {
		setTodoArr(todoArr.map(item => item.id === id
			? { ...item, pin: !item.pin, option: false }
			: item
		))
	};

	const handlerMemo = (id) => {
		setTodoArr(todoArr.map(item => item.id === id
			? { ...item, addMemo: !item.addMemo, isChange: false }
			: item
		))
	};

	const handlerEdit = (id) => {
		setTodoArr(todoArr.map(item => item.id === id
			? { ...item, isChange: !item.isChange, addMemo: false }
			: item
		));
	};

	const handlerDelete = (id) => {
		setTodoArr(todoArr.filter(item => item.id !== id));
	};

	const last = todoArr.length !== 0 ? todoArr.filter(item => item.pin).reduce((acc, rec) => rec, {}) : '';

	return (
		<ul className="todo__menu">
			{todoArr.filter(item => {
				if (status === 'active') {
					return !item.isCompleted;
				} else if (status === 'completed') {
					return item.isCompleted;
				} else {
					return item;
				}
			}).map(item => {
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
									}} />
									: <span className={`todo__list-name ${item.isCompleted ? 'complete' : ''}`}>{item.name}</span>}

								{
									item.addMemo
										? <textarea id='changeMemo' defaultValue={item.memo} className="todo__list-memo-textarea" onChange={(e) => item.memo = e.target.value} />
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
	);
};

export default TodoList;