import { Link } from "react-router";

const ReturnButton = () => {
  return (
    <Link
      to={"/"}
      className="absolute left-[50%] translate-x-[-50%] bottom-[4rem] flex items-center gap-3 bg-purple-600 text-orange-400 px-10 py-3 rounded-xl hover:bg-purple-400 hover:text-rose-900 transition-all duration-300"
    >
      Return to Homepage
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>
    </Link>
  );
};

export default ReturnButton;
