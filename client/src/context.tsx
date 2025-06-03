import { createContext, useContext, useEffect, useState } from "react";

type Todo = {
  todo_id: number;
  description: string;
  done: boolean;
};

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (deletedTodo: Todo) => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function getAllTodos() {
      try {
        const response = await fetch("https://todo-app-as64.onrender.com/");
        if (!response.ok) throw new Error("Failed to fetch todos");

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getAllTodos();
  }, []);

  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
      )
    );
  };

  const deleteTodo = (deletedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.todo_id !== deletedTodo.todo_id)
    );
  };

  return (
    <TodosContext.Provider value={{ todos, setTodos, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
};
