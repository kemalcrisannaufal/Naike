// import Image from "next/image";

const DashboardView = () => {
  return (
    <div className="lg:px-20 lg:py-10">
      {/* Banners */}
      <div className="bg-neutral-200 w-full h-96">
        {/* <Image
          src={"/assets/images/8360368.jpg"}
          alt={"banner"}
          width={1000}
          height={500}
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Category */}
      <div className="flex gap-3 mt-6 border w-full">
        {Array(3)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index} className="border">
                {/* Men's shoes */}
              </div>
            );
          })}
      </div>

      <div></div>
      {/* Products */}
    </div>
  );
};

export default DashboardView;
