type Proptypes = {
  onClick: () => void;
  classname?: string;
  icon: string;
};

const IconButton = (props: Proptypes) => {
  const { onClick, classname, icon } = props;
  return (
    <button
      className={`bg-primary rounded cursor-pointer hover:bg-neutral-700 ${classname}`}
      onClick={onClick}
    >
      <i className={`p-2 text-white text-xs md:text-base bx ${icon}`} />
    </button>
  );
};

export default IconButton;
