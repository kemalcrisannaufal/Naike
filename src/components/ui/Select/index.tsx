/* eslint-disable @typescript-eslint/no-explicit-any */
type Option = {
  label: string;
  value: string;
};

type Proptypes = {
  label?: string;
  name: string;
  options: Option[] | any[];
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  classname?: string;
  variant?: "tight" | "normal";
};

const Select = (props: Proptypes) => {
  const {
    label,
    name,
    options,
    defaultValue,
    disabled,
    onChange,
    classname,
    variant = "normal",
  } = props;
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="mt-1 font-semibold text-neutral-600 text-xs lg:text-sm"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`w-full border border-neutral-300 rounded ${
          variant === "normal"
            ? "py-2 px-1 text-sm md:text-md mt-2"
            : "lg:px-1 text-xs border-none mt-1"
        } text-neutral-600 focus:outline-none focus:border-neutral-600 ${
          disabled && "bg-neutral-300/50"
        } ${classname}`}
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <option value={option.value} key={option.label} className="text-xs">
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
