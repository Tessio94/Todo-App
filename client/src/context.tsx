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

type TodosContextType = {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	updateTodo: (updatedTodo: Todo) => void;
	deleteTodo: (deletedTodo: Todo) => void;
	isLoggedIn: boolean;
	login: (email: string, password: string) => Promise<boolean>;
	register: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

const prodUrl = import.meta.env.VITE_URL_PRODUCTION;

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		async function checkAuth() {
			try {
				const response = await fetch(`${prodUrl}/auth/current-user`, {
					credentials: "include",
				});

				if (response.ok) {
					setIsLoggedIn(true);
					fetchTodos();
				}
			} catch (error) {
				console.log(error);
			}
		}
		checkAuth();
	}, []);

	async function fetchTodos() {
		try {
			const response = await fetch(`${prodUrl}/api`, {
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
		const res = await fetch(`${prodUrl}/auth/login`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (res.ok) {
			setIsLoggedIn(true);
			fetchTodos();
			return true;
		}
		return false;
	};

	const register = async (email: string, password: string) => {
		const res = await fetch(`${prodUrl}/auth/register`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		return res.ok;
	};

	const logout = () => {
		fetch(`${prodUrl}/auth/logout`, {
			method: "POST",
			credentials: "include",
		});
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
				todos,
				setTodos,
				updateTodo,
				deleteTodo,
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
