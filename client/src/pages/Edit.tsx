import { useState } from "react";
import { useParams } from "react-router";
import { useTodos } from "../context";
import ReturnButton from "../components/ReturnButton.tsx";
import Task from "../components/Task.tsx";

const Edit = () => {
  const { id } = useParams();
  const { todos, updateTodo } = useTodos();
  const taskToEdit = todos.find((todo) => todo.todo_id === +id!)?.description;
  const [editTodo, setEditTodo] = useState(taskToEdit || "");
  // console.log(editTodo);

  async function onHandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editTodo.trim()) {
      try {
        const response = await fetch(
          `https://todo-app-as64.onrender.com/edit/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              description: editTodo,
            }),
          }
        );
        const data = await response.json();
        updateTodo(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <main className="relative w-[50%] min-w-[400px] mx-auto">
        <form className="relative" onSubmit={onHandleSubmit}>
          <div className="flex flex-col mt-5 gap-4 text-center">
            <label htmlFor="task" className="text-xl text-purple-600 font-bold">
              Edit your task here:
            </label>
            <input
              type="text"
              name="task"
              id="task"
              className="outline-none border-none text-purple-600 rounded-l-xl py-2 px-10 w-[calc(100%-120px)]   placeholder:text-xl placeholder:text-purple-400"
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
      </main>
      <ReturnButton />
    </>
  );
};

export default Edit;
