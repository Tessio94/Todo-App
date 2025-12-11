import { useState } from "react";
import { useParams } from "react-router";
import { useTodos } from "../context";
import ReturnButton from "../components/ReturnButton.tsx";
import Task from "../components/Task.tsx";

const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

const Edit = () => {
	const { id } = useParams();
	const { todos, updateTodo } = useTodos();
	const taskToEdit = todos.find((todo) => todo.todo_id === +id!)?.description;
	const [editTodo, setEditTodo] = useState(taskToEdit || "");

	async function onHandleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (editTodo.trim()) {
			try {
				const response = await fetch(`${prodUrl}/api/edit/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						description: editTodo,
					}),
					credentials: "include",
				});
				const data = await response.json();
				updateTodo(data);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<>
			<main className="w-full relative sm:w-[50%] sm:min-w-[400px] sm:mx-auto grow max-sm:px-3 z-20">
				<form className="relative" onSubmit={onHandleSubmit}>
					<div className="flex flex-col mt-5 gap-4 text-center">
						<input
							type="text"
							name="task"
							id="task"
							className="outline-none border-none text-purple-600 rounded-l-xl py-2 px-3 sm:px-10 w-[calc(100%-120px)] placeholder:text-lg  sm:placeholder:text-xl input-style placeholder:text-purple-400"
							placeholder="Edit your text here..."
							value={editTodo}
							onChange={(e) => setEditTodo(e.target.value)}
						/>
					</div>
					<button
						className="absolute right-0 bottom-0 bg-purple-600 text-orange-400  w-fit pr-[27px] pl-[32px] py-2 rounded-r-xl font-bold custom-button hover:bg-purple-400 hover:text-rose-900 transition-all duration-300"
						type="submit"
					>
						Edit task
					</button>
				</form>
				<div className="w-full mt-6 mb-10">
					{todos.map((todo, index) =>
						todo.todo_id === +id! ? (
							<Task
								key={todo.todo_id}
								index={index}
								id={todo.todo_id}
								description={todo.description}
								done={todo.done}
								type="edit"
							/>
						) : (
							""
						)
					)}
				</div>
				<ReturnButton />
			</main>
		</>
	);
};

export default Edit;
