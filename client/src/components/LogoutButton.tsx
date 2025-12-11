import { useTodos } from "../context";

const LogoutButton = () => {
	const { logout } = useTodos();

	return (
		<button
			onClick={logout}
			className="mx-auto w-fit flex items-center gap-3 bg-purple-600 text-orange-400 px-10 py-3 rounded-xl hover:bg-purple-400 hover:text-rose-900 transition-all duration-300"
		>
			Logout
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1200pt"
				height="1200pt"
				strokeWidth={1.5}
				stroke="currentColor"
				fill="#fb923c"
				className="size-6"
				version="1.1"
				viewBox="0 0 1200 1200"
			>
				<path d="m1005.6 595.2-177.6-178.8c-9.6016-9.6016-24-9.6016-33.602 0-9.6016 9.6016-9.6016 24 0 33.602l136.8 138h-535.2c-13.199 0-24 10.801-24 24s10.801 24 24 24h535.2l-136.8 136.8c-9.6016 9.6016-9.6016 24 0 33.602 4.8008 4.8008 10.801 7.1992 16.801 7.1992s12-2.3984 16.801-7.1992l177.6-177.6c4.8008-4.8008 7.1992-10.801 7.1992-16.801s-2.4023-12-7.1992-16.801z" />
				<path d="m303.6 972h308.4c13.199 0 24-10.801 24-24s-10.801-24-24-24h-308.4c-48 0-87.602-39.602-87.602-87.602v-448.8c0-48 39.602-87.602 87.602-87.602h308.4c13.199 0 24-10.801 24-24s-10.801-24-24-24h-308.4c-74.402 0-135.6 61.199-135.6 135.6v447.6c0 75.598 61.199 136.8 135.6 136.8z" />
			</svg>
		</button>
	);
};

export default LogoutButton;
