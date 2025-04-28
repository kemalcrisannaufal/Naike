const CardSkeleton = () => {
  return (
    <div className="pb-5 w-full max-w-sm h-80 md:h-100">
      <div className="bg-neutral-200 w-full h-3/5 md:h-3/4 overflow-hidden animate-pulse" />
      <div className="px-3 py-2">
        <p className="bg-neutral-200 mb-2 h-6 animate-pulse" />
        <p className="bg-neutral-200 mb-2 h-4 animate-pulse" />
        <p className="bg-neutral-200 mb-2 h-4 animate-pulse" />
      </div>
    </div>
  );
};

export default CardSkeleton;
