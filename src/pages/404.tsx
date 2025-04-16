const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center bg-white p-8 min-h-screen text-center">
      <div>
        <h1 className="mb-4 font-bold text-neutral-700 text-4xl">
          404 - Page Not Found
        </h1>
        <p className="text-neutral-600">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
