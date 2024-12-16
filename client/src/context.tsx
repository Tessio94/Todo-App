import {
  children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getAllTodos() {
      try {
        const response = await fetch("http://localhost:5001/");
        if (!response.ok) throw new Error("Failed to fetch todos");

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getAllTodos();
  }, []);

  const updateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.todo_id === updatedTodo.todo_id ? updatedTodo : todo
      )
    );
  };

  const deleteTodo = (deletedTodo) => {
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
