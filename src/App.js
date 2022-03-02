import React, { useState } from "react";
import Add from "./components/Add/Add";
import "./style.css";

//Todo1 1:01:00

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

	return (
		<div className="App">
			<div className="todo">
				<div>
					<p>{weekDays[date.getDay()]}</p>
					<p>{toDate(date)}</p>
				</div>

				<Add todo={todo} setTodo={setTodo} setTodoArr={setTodoArr} todoArr={todoArr} />

				<ul>
					{todoArr.map((item, idx) => {
						return (
							<li key={item.id}>
								<label>
									<input type="chekbox" />
								</label>
								<span>{item.name}</span>
							</li>
						)
					})}
				</ul>

			</div>
		</div>
	);
}

export default App;
