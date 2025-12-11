import { Outlet, Navigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTodos } from "../context";
import { toast } from "sonner";
import { PropagateLoader } from "react-spinners";

const PublicLayout = () => {
	const { authLoading, isLoggedIn, justLoggedIn } = useTodos();

	if (authLoading) {
		return <PropagateLoader color="#9333ea" />;
	}

	if (isLoggedIn) {
		if (!justLoggedIn) {
			toast.info("You are already logged in!");
		}
		return <Navigate to="/" replace />;
	}

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default PublicLayout;
