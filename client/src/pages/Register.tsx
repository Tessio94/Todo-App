import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTodos } from "../context";
import { toast } from "sonner";
import { z } from "zod";

export const RegisterSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});

const Register = () => {
	const { register } = useTodos();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const { registerResult, message } = await register(email, password);
		if (registerResult) {
			toast.success(message);
			navigate("/login");
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
		<main className="flex justify-center items-center max-sm:px-5 max-w-full grow z-10">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col p-8 rounded-xl shadow-md bg-white gap-4 w-[350px]"
			>
				<h1 className="text-2xl font-bold text-purple-600 text-center">
					Register
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
					Create Account
				</button>
				<p className="text-center text-sm">
					Already have an account?{" "}
					<Link to="/login" className="text-purple-600 underline">
						Login
					</Link>
				</p>
			</form>
		</main>
	);
};

export default Register;
