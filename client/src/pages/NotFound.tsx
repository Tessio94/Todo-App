import Footer from "../components/Footer";
import ReturnButton from "../components/ReturnButton";

const NotFound = () => {
	return (
		<>
			<main className="mt-[6rem] grow flex flex-col items-center gap-10">
				<h1 className="lg:text-5xl text-3xl font-bold text-purple-600 text-center">
					<span className="text-orange-600">404</span> Page not found
				</h1>
				<ReturnButton />
			</main>
			<Footer />
		</>
	);
};

export default NotFound;
