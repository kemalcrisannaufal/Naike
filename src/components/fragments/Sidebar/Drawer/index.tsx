import Image from "next/image";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import NavButton from "../../Navbar/NavButton";

type SidebarItem = {
  name: string;
  url: string;
  icon: string;
};

type Proptypes = {
  menu: SidebarItem[];
  onclose: () => void;
};

const AdminDrawer = (props: Proptypes) => {
  const { menu, onclose } = props;

  return (
    <div className="top-0 right-0 z-50 fixed bg-white px-10 pt-20 w-4/5 h-screen">
      <NavButton
        iconClass="bx-x"
        onClick={onclose}
        classname="absolute top-3 right-3 bg-neutral-100"
      />
      {menu.map((item, index) => {
        return (
          <Link
            href={item.url}
            onClick={onclose}
            key={index}
            className="flex justify-between items-center mb-4 w-full"
          >
            <div className="flex items-center gap-2">
              <i className={`text-2xl ${item.icon}`} />
              <p className="font-medium text-2xl">{item.name}</p>
            </div>
            <i className="bx-chevron-right text-4xl bx" />
          </Link>
        );
      })}

      {/* Logo */}
      <div className="mt-10">
        <Image
          src="/assets/images/naike/logo.png"
          width={200}
          height={200}
          className="w-1/2 h-1/2 object-contain object-left"
          alt="Naike"
          priority
        />
      </div>

      {/* Logout */}
      <div className="mt-20">
        <p className="font-semibold text-neutral-600 text-xl text-justify leading-relaxed tracking-tight">
          Naike is a learning project inspired by Nike, crafted to explore web
          development, design principles, and responsive user experiences.
        </p>
      </div>
      <Button
        onClick={() => signOut()}
        classname="rounded-full text-md px-5 mt-10"
      >
        Logout
      </Button>

      {/* About Us */}
      <div>
        <p className="mt-32 text-neutral-600 text-xs">
          Naike is a learning project inspired by Nike, crafted to explore web
          development, design principles, and responsive user experiences.
        </p>
      </div>
    </div>
  );
};

export default AdminDrawer;
