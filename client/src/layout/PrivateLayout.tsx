import { Outlet, Navigate } from "react-router";
import { useTodos } from "../context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { PropagateLoader } from "react-spinners";

const PrivateLayout = () => {
	const { authLoading, isLoggedIn, user } = useTodos();

	if (authLoading) {
		return <PropagateLoader color="#9333ea" />;
	}

	if (!isLoggedIn || !user) {
		toast.error("Log in to create a todo task!");
		return <Navigate to="/login" replace />;
	}

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default PrivateLayout;
