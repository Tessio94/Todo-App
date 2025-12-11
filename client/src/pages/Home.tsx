import { useState } from "react";
import Task from "../components/Task";
import { useTodos } from "../context";
import LogoutButton from "../components/LogoutButton";

const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

const Home = () => {
  const [task, setTask] = useState("");
  const { user, todos, setTodos } = useTodos();
  console.log("user", user);
  async function onHandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (task.trim()) {
      try {
        const response = await fetch(`${prodUrl}/api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: task,
            done: false,
            user_id: user!.id,
          }),
          credentials: "include",
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
    <main className="w-full sm:w-[50%] sm:min-w-[400px] sm:mx-auto grow max-sm:px-3 z-20">
      <form className="relative" onSubmit={onHandleSubmit}>
        <div className="flex flex-col mt-5 gap-4 text-center">
          <input
            type="text"
            name="task"
            id="task"
            className="outline-none border-none text-purple-600 rounded-l-xl py-2 px-3 sm:px-10 w-[calc(100%-120px)] input-style placeholder:text-lg sm:placeholder:text-xl placeholder:text-purple-400"
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
        <div className="flex flex-col w-full mt-6 mb-10 gap-5 max-h-[500px] overflow-y-scroll">
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
      <LogoutButton />
    </main>
  );
};

export default Home;
