const Footer = () => {
  return (
    <div className="px-10">
      <div className="flex justify-between items-center gap-5 border-neutral-200 border-t w-full h-20">
        <p className="font-semibold text-neutral-600 text-sm">
          Made with ❤️ by KCR
        </p>
        <div className="flex gap-2">
          <p className="flex items-center gap-2 font-semibold text-neutral-600 text-sm">
            Help
          </p>
          <p className="flex items-center gap-2 font-semibold text-neutral-600 text-sm">
            <i className="text-md bx bx-globe" /> Indonesia
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
