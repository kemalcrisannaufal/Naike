type Proptypes = {
  iconClass: string;
  onClick: () => void;
};

const NavButton = (props: Proptypes) => {
  const { iconClass, onClick } = props;
  return (
    <button
      type="button"
      className="flex justify-center items-center hover:bg-neutral-200 p-1 border-none rounded-full transition-all duration-100 ease-in-out cursor-pointer"
      onClick={onClick}
    >
      <i className={`text-neutral-600 text-lg md:text-2xl bx ${iconClass}`} />
    </button>
  );
};

export default NavButton;
