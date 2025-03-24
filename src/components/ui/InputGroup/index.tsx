type Proptypes = {
  title: string;
  children: React.ReactNode;
};
const InputGroup = (props: Proptypes) => {
  const { title, children } = props;
  return (
    <div>
      <p className="mt-6 font-semibold text-md text-neutral-700">{title}</p>
      <div className="bg-neutral-200 mt-1 mb-3 w-full h-[1px]" />
      {children}
    </div>
  );
};

export default InputGroup;
