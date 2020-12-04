function Button({ onClick, id, color, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 border-2 border-${
        color ? color : "denim"
      } ${className}`}
      type="button"
      id={id}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
