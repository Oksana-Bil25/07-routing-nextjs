interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-2 rounded-xl font-semibold transition-all active:scale-95";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
