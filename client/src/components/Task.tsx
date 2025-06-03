import { useState } from "react";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { useTodos } from "../context";

type TaskProps = {
  index: number;
  id: number;
  description: string;
  done: boolean;
  type: "add" | string;
};

const Task = ({ index, id, description, done, type }: TaskProps) => {
  const [check, setCheck] = useState<boolean>(done);
  const { updateTodo, deleteTodo } = useTodos();

  async function handleCheck() {
    try {
      const updatedCheck = !check;
      setCheck((check) => !check);

      const response = await fetch("https://todo-app-as64.onrender.com/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          done: updatedCheck,
        }),
      });
      const data = await response.json();
      // console.log(data);
      // console.log(`done: ${done}`);
      updateTodo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch("https://todo-app-as64.onrender.com/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      console.log(data);
      // console.log(`done: ${done}`);
      deleteTodo(data);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(`Done: ${done}`);

  return (
    <div className="max-w-full w-full flex  items-center justify-between gap-5 border-purple-600 border-2 rounded-xl py-1 px-3 bg-slate-200 shadow-lg hover:shadow-xl hover:bg-slate-300 transition-all duration-300">
      <p
        className={`text-purple-600 text-xl flex items-end gap-5 overflow-auto py-1 ${
          check ? "line-through" : ""
        }`}
      >
        <span className="text-orange-600 text-2xl font-bold">{index + 1}.</span>
        {description}
      </p>
      {type === "add" ? (
        <div className="flex items-center gap-5">
          <Button type="checkbox" onClick={handleCheck}>
            <Icon iconType="check" checked={check} />
          </Button>

          <Button type="link" href={`/edit/${id}`}>
            <Icon iconType="edit" />
          </Button>

          <Button type="button" onClick={handleDelete}>
            <Icon iconType="delete" />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Task;
