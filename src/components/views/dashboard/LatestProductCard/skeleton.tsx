type Proptypes = {
  key: number;
};

const LatestProductCardSkeleton = (props: Proptypes) => {
  const { key } = props;
  return (
    <div
      key={key}
      className="bg-neutral-200 md:w-full min-w-[320px] md:min-w-sm h-108 animate-blink"
    />
  );
};

export default LatestProductCardSkeleton;
