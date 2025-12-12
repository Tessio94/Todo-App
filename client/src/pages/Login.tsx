import { useState } from "react";
import { useTodos } from "../context";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import LinearBackground from "../components/LinearBackground";

export default function Login() {
	const { login } = useTodos();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const { loginResult, message } = await login(email, password);

		if (loginResult) {
			toast.success(message);
			navigate("/");
		} else {
			toast.error(
				<ul className="list-disc ml-4">
					{Array.isArray(message) ? (
						message.map((msg: string, i) => <li key={i}>{msg}</li>)
					) : (
						<li>{message}</li>
					)}
				</ul>
			);
		}
	}

	return (
		<main className="flex justify-center items-center max-sm:px-5 max-w-full grow z-50">
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
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					className="border p-2 rounded"
					type="password"
					placeholder="Password..."
					autoComplete="current-password"
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
