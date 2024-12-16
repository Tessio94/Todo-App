import { Link } from "react-router";

const Button = ({ children, type, href, onClick }) => {
  if (type === "checkbox") {
    return (
      <button
        className="flex items-center justify-center w-10 h-10 border-2 border-purple-600  bg-slate-200 text-orange-400  rounded-xl hover:bg-purple-400 hover:text-orange-900 transition-all duration-300"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      {type === "link" ? (
        <Link
          to={href}
          className="bg-purple-600 text-orange-400 p-2 rounded-xl hover:bg-purple-400 hover:text-orange-900 transition-all duration-300"
        >
          {children}
        </Link>
      ) : (
        <button
          className="bg-purple-600 text-orange-400 p-2 rounded-xl hover:bg-purple-400 hover:text-orange-900 transition-all duration-300"
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
