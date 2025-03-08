type Proptypes = {
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = (props: Proptypes) => {
  const { label, name, placeholder, type, defaultValue, disabled } = props;
  return (
    <div className="flex flex-col gap-2 mb-3">
      <label
        htmlFor={name}
        className="text-xs lg:text-sm text-neutral-600 font-semibold"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border border-neutral-300 rounded p-2 text-neutral-600 focus:outline-none focus:border-neutral-600 ${
          disabled && "bg-neutral-300/50"
        }`}
        id={name}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
