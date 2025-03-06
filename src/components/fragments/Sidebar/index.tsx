/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import { useState } from "react";

type SidebarItem = {
  name: string;
  url: string;
  icon: string;
};

type Proptype = {
  listItem: SidebarItem[];
};

const Sidebar = (props: Proptype) => {
  const { listItem } = props;
  const { pathname } = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="lg:w-1/5 bg-indigo-800 h-max lg:h-screen p-3 lg:p-5 lg:pt-8 flex lg:flex-col justify-between">
      <div className="w-full">
        <div className="w-full h-14 lg:h-20 text-center text-white font-bold lg:mb-3 overflow-hidden flex justify-between items-center lg:flex-col lg:justify-start">
          <Link href={"/admin"}>
            <img
              src="/assets/images/crisorca-logo-white-font-removebg.png"
              alt="Crisorca"
              className="h-10 object-contain"
            />
          </Link>
          <p className="hidden lg:block lg:text-md xl:text-lg tracking-wider">
            Admin Panel
          </p>

          <Button
            type="button"
            classname="w-10 h-10 lg:hidden flex justify-center items-center"
            onClick={handleClick}
          >
            <i className="bx bx-menu text-3xl text-white font-semibold"></i>
          </Button>
        </div>

        <div className={`${isMenuOpen ? "block mt-2" : "hidden"} lg:block`}>
          {listItem.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.url}
                onClick={() => setMenuOpen(false)}
                className={`w-full p-2 rounded mb-1 flex gap-2 justify-start items-center hover:bg-white hover:text-indigo-800 transition-colors duration-300 ease-in-out ${
                  pathname === item.url
                    ? "bg-white text-indigo-800"
                    : "text-white"
                }`}
              >
                <i className={`${item.icon} text-xl`} />
                <p className="font-semibold text-sm lg:text-md">{item.name}</p>
              </Link>
            );
          })}
          <div className="lg:hidden w-full">
            <Button
              type="button"
              variant="secondary"
              classname="w-full"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-full">
        <Button
          type="button"
          variant="secondary"
          classname="w-full"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
