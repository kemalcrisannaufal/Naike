/* eslint-disable @typescript-eslint/no-explicit-any */
type Proptypes = {
  label: string;
  name: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
};

const TextArea = (props: Proptypes) => {
  const { label, name, onChange, defaultValue } = props;
  return (
    <div>
      <label
        htmlFor={name}
        className="font-semibold text-neutral-600 text-xs lg:text-sm"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        cols={30}
        rows={3}
        defaultValue={defaultValue}
        className="p-2 border border-neutral-300 focus:border-neutral-600 rounded focus:outline-none w-full text-neutral-600 text-sm"
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
