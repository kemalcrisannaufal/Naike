type Proptypes = {
  children: React.ReactNode;
  variant?: "small" | "large";
};

const Title = (props: Proptypes) => {
  const { children, variant = "large" } = props;
  return (
    <h1
      className={`font-semibold ${
        variant === "small"
          ? "text-lg md:text-xl lg:text-2xl"
          : "text-xl md:text-2xl lg:text-3xl"
      } tracking-tighter`}
    >
      {children}
    </h1>
  );
};

export default Title;
