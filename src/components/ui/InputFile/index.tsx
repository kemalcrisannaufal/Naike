/* eslint-disable @typescript-eslint/no-explicit-any */
type Proptypes = {
  label: string;
  name: string;
  onChange?: (e: any) => void;
};

const InputFile = (props: Proptypes) => {
  const { name, label, onChange } = props;
  return (
    <div className="w-full">
      <label
        htmlFor="upload-image"
        className="flex justify-center items-center gap-5 bg-neutral-200 hover:bg-neutral-400 px-4 py-2 rounded w-full h-20 text-neutral-700 text-xs md:text-sm cursor-pointer text"
      >
        <i className="text-2xl bx bx-upload" />
        {label}
      </label>
      <input
        type="file"
        name={name}
        id="upload-image"
        onChange={onChange}
        hidden
      />
    </div>
  );
};
export default InputFile;
