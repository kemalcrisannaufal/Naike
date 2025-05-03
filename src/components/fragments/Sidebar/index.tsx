import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import AdminDrawer from "./Drawer";

type SidebarItem = {
  name: string;
  url: string;
  icon: string;
};

const listItem: SidebarItem[] = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: "bx bxs-dashboard",
  },
  {
    name: "Orders",
    url: "/admin/orders",
    icon: "bx bxs-shopping-bag",
  },
  {
    name: "Payments",
    url: "/admin/payments",
    icon: "bx bx-money",
  },
  {
    name: "Products",
    url: "/admin/products",
    icon: "bx bxs-box",
  },
  {
    name: "Users",
    url: "/admin/users",
    icon: "bx bxs-group",
  },
];

const Sidebar = () => {
  const { pathname } = useRouter();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleClick = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="top-0 z-50 sticky flex lg:flex-col justify-between bg-white lg:bg-neutral-100 px-5 lg:px-5 py-2 lg:pt-8 border-neutral-200 border-r w-full lg:w-72 h-full lg:min-h-screen">
        {/* Sidebar Content */}
        <div className="w-full">
          {/* Logo & Menu */}
          <div className="flex lg:flex-col justify-between lg:justify-start items-center mb-2 lg:mb-6 w-full h-auto">
            <Link href={"/admin"} className="w-1/2 lg:w-full">
              <Image
                src="/assets/images/naike/logo.png"
                alt="Naike"
                width={500}
                height={500}
                className="h-6 lg:h-10 object-contain object-left lg:object-center"
                priority
              />
            </Link>
            <button
              type="button"
              className="lg:hidden flex justify-center items-center w-10 h-10"
              onClick={handleClick}
            >
              <i className="font-semibold text-neutral-700 text-3xl bx bx-menu" />
            </button>
          </div>

          {/* Menu Items */}
          <div className={`hidden lg:block`}>
            {listItem.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                onClick={() => setDrawerOpen(false)}
                className={`w-full p-2 lg:p-3 mb-2 flex justify-start items-center gap-2 rounded ${
                  pathname === item.url
                    ? "bg-primary text-white"
                    : "text-neutral-700 hover:bg-neutral-200 transition-all ease-in-out duration-100"
                }`}
              >
                <i className={`${item.icon} text-xl`} />
                <p className="font-semibold lg:text-md text-sm">{item.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Logout */}
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

      {isDrawerOpen && (
        <AdminDrawer menu={listItem} onclose={() => setDrawerOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
