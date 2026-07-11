import { useState } from 'react'
import './App.css'

function App() {
	/*{
		id: 1,
		item: text,
		isCompleted: true,
		isEditable: false
	}*/
	const [todos, setTodos] = useState([])
	const [todoItem, setTodoItem] = useState('')

	const updateTodoItem = (e) => {
		console.log('Target', e.target.value)
		setTodoItem(e.target.value)
	}

	const addTodo = () => {
		if (!todoItem.trim()) return
		const newTodo = {
			id: crypto.randomUUID(),
			item: todoItem,
			isCompleted: false,
			isEditable: false
		}

		setTodos((prevTodos) => [...prevTodos, newTodo])
		setTodoItem('')
	}

	const updateTodos = (e) => {
		if (e.key === 'Enter') {
			addTodo()
		}
	}

	const editTodoItem = (id) => {
		// console.log(e.target.value)
		setTodos((prevTodos) =>
			prevTodos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, isEditable: true }
				} else {
					return todo
				}
			})
		)
	}
	return (
		<>
			<div className="container">
				<h2>Todos</h2>
				<input
					id="todoInput"
					className="todoInput"
					placeholder="What task to be done?"
					value={todoItem}
					onChange={(e) => updateTodoItem(e)}
					onKeyDown={updateTodos}
				/>
				<div className="todosList">
					{todos.map((todo) =>
						todo.isEditable ? (
							<input
								autoFocus
								defaultValue={todo.item}
								onKeyDown={(e) => {
									console.log('isenter outside', e.key)
									if (e.key === 'Enter') {
										console.log('isenter', e.key)
										setTodos((prevTodos) =>
											prevTodos.map((t) =>
												t.id === todo.id
													? {
															...t,
															item: e.target
																.value,
															isEditable: false
													  }
													: t
											)
										)
									}
								}}
							/>
						) : (
							<div
								key={todo.id}
								onDoubleClick={() => editTodoItem(todo.id)}
							>
								{todo.item}
							</div>
						)
					)}
				</div>
			</div>
		</>
	)
}

export default App
