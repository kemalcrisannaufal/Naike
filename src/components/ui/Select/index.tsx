type Option = {
  label: string;
  value: string;
};

type Proptypes = {
  label: string;
  name: string;
  options: Option[];
  defaultValue?: string;
  disabled?: boolean;
};

const Select = (props: Proptypes) => {
  const { label, name, options, defaultValue, disabled } = props;
  return (
    <div className="flex flex-col gap-2 mb-3">
      <label
        htmlFor={name}
        className="text-xs lg:text-sm text-neutral-600 font-semibold"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`w-full border border-neutral-300 rounded p-2 text-neutral-600 focus:outline-none focus:border-neutral-600 ${
          disabled && "bg-neutral-300/50"
        }`}
      >
        {options.map((option) => {
          return (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
