// import Image from "next/image";

import Image from "next/image";

type Proptypes = {
  category: {
    name: string;
    image: string;
    url: string;
  }[];
};

const DashboardView = (props: Proptypes) => {
  const { category } = props;
  return (
    <div className="lg:px-20 lg:py-10">
      {/* Banners */}
      <div className="bg-neutral-200 w-full h-96 animate-blink">
        {/* <Image
          src={"/assets/images/8360368.jpg"}
          alt={"banner"}
          width={1000}
          height={500}
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Category */}
      <div className="flex gap-3 mt-6 p-2 border border-neutral-200 rounded-md">
        {category.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 shadow-md p-2 border border-neutral-200 rounded-md"
            >
              <div className="w-24 h-24 overflow-hidden">
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {item.name}
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
