const TextField = ({ name, ...rest }) => {
  return (
    <input
      className="border-2 border-denim rounded-lg px-4 py-2 focus:outline-none"
      placeholder="yourmail@me.io"
      name={name}
      {...rest}
    />
  );
};

export default TextField;
