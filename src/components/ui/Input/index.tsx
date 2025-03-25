/* eslint-disable @typescript-eslint/no-explicit-any */
type Proptypes = {
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: any;
  value?: any;
  multiple?: boolean;
};

const Input = (props: Proptypes) => {
  const {
    label,
    name,
    placeholder,
    type,
    defaultValue,
    onChange,
    disabled,
    value,
    multiple = false,
  } = props;
  return (
    <div className="flex flex-col gap-2 mb-3 w-full">
      <label
        htmlFor={name}
        className="font-semibold text-neutral-600 text-xs lg:text-sm"
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={`w-full border border-neutral-300 rounded p-2 text-neutral-600 focus:outline-none focus:border-neutral-600 ${
          disabled && "bg-neutral-100"
        }`}
        id={name}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        multiple={multiple}
      />
    </div>
  );
};

export default Input;
