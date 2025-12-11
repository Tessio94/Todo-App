import { createContext, useContext, useEffect, useState } from "react";

type Todo = {
  todo_id: number;
  description: string;
  done: boolean;
};

type User = {
  id: number;
  email: string;
};

type LoginResult = {
  loginResult: boolean;
  message: string | string[];
};

type RegisterResult = {
  registerResult: boolean;
  message: string | string[];
};

type TodosContextType = {
  user: User | undefined;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (deletedTodo: Todo) => void;
  authLoading: boolean;
  justLoggedIn: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (email: string, password: string) => Promise<RegisterResult>;
  logout: () => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [justLoggedIn, setJustLoggedIn] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  async function elapse(startTime: number) {
    const elapsed = Date.now() - startTime;
    const extra = 1500 - elapsed;

    if (extra > 0) {
      await new Promise((res) => setTimeout(res, extra));
    }
  }

  useEffect(() => {
    async function checkAuth() {
      const start = Date.now();
      try {
        const response = await fetch(`${prodUrl}/auth/current-user`, {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to find logged in user.");

        const data = await response.json();

        setUser(data);
        setIsLoggedIn(true);
        fetchTodos(data.id);
      } catch (error) {
        console.log(error);
      } finally {
        await elapse(start);
        setAuthLoading(false);
      }
    }
    checkAuth();
  }, []);

  async function fetchTodos(id: number) {
    try {
      const response = await fetch(`${prodUrl}/api?user_id=${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        setIsLoggedIn(false);
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  const login = async (email: string, password: string) => {
    const start = Date.now();
    setAuthLoading(true);
    try {
      const res = await fetch(`${prodUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        await elapse(start);
        setAuthLoading(false);
        if (Array.isArray(data.error)) {
          return {
            loginResult: false,
            message: data.error,
          };
        }

        throw new Error(data.error || "Unkown error");
      }
      setJustLoggedIn(true);
      setIsLoggedIn(true);
      setUser(data.user);
      await fetchTodos(data.user.id);
      await elapse(start);
      setAuthLoading(false);
      return {
        loginResult: true,
        message: "Successful login!",
      };
    } catch (error) {
      setAuthLoading(false);
      return {
        loginResult: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const res = await fetch(`${prodUrl}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (Array.isArray(data.error)) {
          return {
            registerResult: false,
            message: data.error,
          };
        }
        throw new Error(data.error || "Unkown error");
      }

      return {
        registerResult: true,
        message: "Successful registration!",
      };
    } catch (error) {
      return {
        registerResult: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    fetch(`${prodUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const start = Date.now();
    await elapse(start);
    setAuthLoading(false);
    setIsLoggedIn(false);
    setTodos([]);
  };

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
    <TodosContext.Provider
      value={{
        user,
        todos,
        setTodos,
        updateTodo,
        deleteTodo,
        authLoading,
        justLoggedIn,
        isLoggedIn,
        login,
        register,
        logout,
      }}
    >
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
