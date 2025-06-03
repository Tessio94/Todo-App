import { Link } from "react-router";

type ButtonProps = {
  children: React.ReactNode;
  type: "checkbox" | "link" | "button";
  href?: string;
  onClick?: () => void | Promise<void>;
};

const Button = ({ children, type, href, onClick }: ButtonProps) => {
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
      {type === "link" && href ? (
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
