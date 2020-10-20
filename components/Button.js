function Button({ onClick, id, ...props }) {
  return (
    <button
      className="px-4 py-2 border-2 border-denim"
      type="button"
      id={id}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
