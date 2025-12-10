import { Outlet, Navigate } from "react-router";
import { useTodos } from "../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Toaster, toast } from "sonner";

const PrivateLayout = () => {
	const { isLoggedIn } = useTodos();

	if (!isLoggedIn) {
		toast.error("Log in to create a todo task!");
		return <Navigate to="/login" replace />;
	}

	return (
		<>
			<Toaster
				toastOptions={{
					style: {
						color: "#ef4444",
						border: "2px solid #ef4444",
					},
				}}
			/>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default PrivateLayout;
