import { useState } from "react";
import { useTodos } from "../context";
import { useNavigate, Link } from "react-router";

export default function Login() {
	const { login } = useTodos();
	const nav = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const success = await login(email, password);
		if (success) nav("/");
		else alert("Invalid credentials");
	}

	return (
		<main className="flex justify-center items-center max-sm:px-5 max-w-full grow z-10">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col p-8 rounded-xl shadow-md bg-white gap-4 w-[350px]"
			>
				<h1 className="text-2xl font-bold text-purple-600 text-center">
					Login
				</h1>

				<input
					className="border p-2 rounded"
					type="email"
					placeholder="Email..."
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					className="border p-2 rounded"
					type="password"
					placeholder="Password..."
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="bg-purple-600 text-white p-2 rounded hover:bg-purple-500">
					Login
				</button>

				<p className="text-center text-sm">
					No account?{" "}
					<Link to="/register" className="text-purple-600 underline">
						Register
					</Link>
				</p>
			</form>
		</main>
	);
}
