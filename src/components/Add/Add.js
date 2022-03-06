import React from 'react';

const Add = ({ status, setStatus, todo, setTodo, setTodoArr, todoArr }) => {

	const addTodo = (e) => {
		e.preventDefault();
		setTodoArr([...todoArr, {
			name: todo,
			isCompleted: false,
			isChange: false,
			pin: false,
			isActive: true,
			option: false,
			addMemo: false,
			memo: '',
			id: Math.floor(Math.random() * 10000)
		}]);
		setTodo('');
	};

	const handlerAdd = (e) => {
		setTodo(e.target.value);
		setTodoArr(todoArr.map((item, idx) => {
			return {...item, option: false}
		}))
	};

	return (
		<div className="todo__add">
			<form className="todo__left" onSubmit={addTodo}>
				<label>
					<input maxLength={30} onChange={handlerAdd} value={todo} className="todo__add-input" type="text" required />
				</label>
				<button type="submit" className="todo__add-btn">+</button>
			</form>

			<div className="todo__right">
				<select defaultValue={'all'} className="todo__add-select" onChange={(e) => setStatus(e.target.value)}>
					<option value="all">all</option>
					<option value="completed">completed</option>
					<option value="active">active</option>
				</select>
			</div>

		</div>
	);
};

export default Add;