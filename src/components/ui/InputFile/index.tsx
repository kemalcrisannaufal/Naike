type Proptypes = {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFile = (props: Proptypes) => {
  const { name, label, onChange } = props;

  return (
    <div className="block w-full">
      <label
        htmlFor={name}
        className="flex justify-center items-center gap-5 bg-neutral-200 hover:bg-neutral-400 m-0 px-4 py-2 rounded w-full h-16 text-neutral-700 text-xs md:text-sm cursor-pointer"
      >
        <i className="text-2xl bx bx-upload" />
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={onChange}
        hidden
        multiple
      />
    </div>
  );
};

export default InputFile;
