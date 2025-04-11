type Proptypes = {
  icon: string;
  onClick?: () => void;
  disabled?: boolean;
};

const ActionButton = (props: Proptypes) => {
  const { icon, onClick, disabled } = props;
  return (
    <button
      className={`p-1 cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      <i className={`bx ${icon} ${disabled && "text-neutral-300"}`} />
    </button>
  );
};

export default ActionButton;
