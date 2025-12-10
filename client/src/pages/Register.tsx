import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTodos } from "../context";

const Register = () => {
	const { register } = useTodos();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const success = await register(email, password);
		if (success) navigate("/login");
		else alert("Registration failed");
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
