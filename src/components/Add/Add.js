import React from 'react';

const Add = ({ todo, setTodo, setTodoArr, todoArr }) => {

	const addTodo = (e) => {
		e.preventDefault();
		setTodoArr([...todoArr, {
			name: todo,
			isCompleted: false,
			isChange: false,
			isImportant: false,
			isActive: true,
			option: false,
			id: Math.floor(Math.random() * 10000)
		}]);
		setTodo('');
	};

	return (
		<div className="todo__add">
			<form className="todo__left" onSubmit={addTodo}>
				<label>
					<input onChange={(e) => setTodo(e.target.value)} value={todo} className="todo__add-input" type="text" required />
				</label>
				<button type="submit" className="todo__add-btn">+</button>
			</form>
			<div className="todo__right">
				<select className="todo__add-select" name="" id="">
					<option value="">all</option>
				</select>
			</div>
		</div>
	);
};

export default Add;