type Proptypes = {
  title: string;
  value: number | string;
  icon: string;
  description?: string;
  loading: boolean;
};
const StatsCard = (props: Proptypes) => {
  const { title, value, icon, description, loading } = props;
  return (
    <div className="relative p-5 border-2 border-neutral-200 rounded">
      <div className="top-3 right-2 absolute">
        <i className={`bg-neutral-200 rounded-full text-3xl p-1 bx ${icon}`} />
      </div>
      <p className="font-semibold text-lg">{title}</p>
      <p className="text-neutral-600 text-sm">{description}</p>
      {loading ? (
        <div className="bg-neutral-200 mt-2 w-full h-8 animate-pulse" />
      ) : (
        <p className="mt-3 font-bold text-2xl">{value}</p>
      )}
    </div>
  );
};

export default StatsCard;
