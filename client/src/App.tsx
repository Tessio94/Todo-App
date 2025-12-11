import { BrowserRouter, Route, Routes } from "react-router";
import { TodosProvider } from "./context.tsx";
import PrivateLayout from "./layout/PrivateLayout.tsx";
import PublicLayout from "./layout/PublicLayout.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import Edit from "./pages/Edit.tsx";
import { Toaster } from "sonner";

function App() {
	return (
		<TodosProvider>
			<BrowserRouter>
				<Toaster position="top-center" closeButton richColors />
				<Routes>
					<Route element={<PublicLayout />}>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>

					<Route path="/" element={<PrivateLayout />}>
						<Route index element={<Home />} />
						<Route path="edit/:id" element={<Edit />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</TodosProvider>
	);
}

export default App;
