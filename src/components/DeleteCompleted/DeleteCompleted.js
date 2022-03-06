import React from 'react';

const DeleteCompleted = ({todoArr, setTodoArr}) => {

	const deleteAllCompleted = () => {
		setTodoArr(todoArr.filter((item, idx) => {
			return !item.isCompleted;
		}))
	};

	return (
		<p className="todo__deleteCompleted" onClick={deleteAllCompleted}>Delete completed</p>
	);
};

export default DeleteCompleted;