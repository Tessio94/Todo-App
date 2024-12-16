// import { useEffect, useState } from "react";
import { useState } from "react";
import Task from "../components/Task";
import { useTodos } from "../context";

const Home = () => {
  const [task, setTask] = useState("");
  const { todos, setTodos, updateTodo } = useTodos();

  async function onHandleSubmit(e) {
    e.preventDefault();
    if (task.trim()) {
      try {
        const response = await fetch(`http://localhost:5001/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: task,
            done: false,
          }),
        });
        const data = await response.json();

        setTodos((prevTodos) => [...prevTodos, data]);
        setTask("");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <main className="w-[50%] min-w-[400px] mx-auto">
      <form className="relative" onSubmit={onHandleSubmit}>
        <div className="flex flex-col mt-5 gap-4 text-center">
          <label htmlFor="task" className="text-xl text-purple-600 font-bold">
            Write your next task:
          </label>
          <input
            type="text"
            name="task"
            id="task"
            className="outline-none border-none text-purple-600 rounded-l-xl py-2 px-10 w-[calc(100%-120px)] input-style placeholder:text-xl placeholder:text-purple-400"
            placeholder="Write your text here..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <button
          className="absolute right-0 bottom-0 bg-purple-600 text-orange-400  w-fit pr-[27px] pl-[32px] py-2 rounded-r-xl font-bold custom-button hover:bg-purple-400 hover:text-rose-900 transition-all duration-300"
          type="submit"
        >
          Add task
        </button>
      </form>

      {
        <div className="flex flex-col w-full mt-6 mb-10 gap-5">
          {todos.map((todo, index) => {
            const { todo_id, description, done } = todo;

            return (
              <Task
                key={todo_id}
                index={index}
                id={todo_id}
                description={description}
                done={done}
                type="add"
              />
            );
          })}
        </div>
      }
    </main>
  );
};

export default Home;
