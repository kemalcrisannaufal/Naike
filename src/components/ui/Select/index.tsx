/* eslint-disable @typescript-eslint/no-explicit-any */
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
  onChange?: (e: any) => void;
};

const Select = (props: Proptypes) => {
  const { label, name, options, defaultValue, disabled, onChange } = props;
  return (
    <div className="flex flex-col gap-2 mb-3">
      <label
        htmlFor={name}
        className="font-semibold text-neutral-600 text-xs lg:text-sm"
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
        onChange={onChange}
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
