/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import NavButton from "../NavButton";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

type Proptypes = {
  menu: { label: string; url: string; disabled: boolean }[];
  onclose: () => void;
  session: any;
};

const Drawer = (props: Proptypes) => {
  const { menu, onclose, session } = props;

  const { push } = useRouter();

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
            <p className="font-medium text-2xl">{item.label}</p>
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

      {/* Login or Logout */}
      <div className="mt-20">
        <p className="font-semibold text-neutral-600 text-xl text-justify leading-relaxed tracking-tight">
          Naike is a learning project inspired by Nike, crafted to explore web
          development, design principles, and responsive user experiences.
        </p>
      </div>
      {session.data ? (
        <div className="flex justify-end mt-5">
          <Button
            onClick={() => signOut()}
            classname="rounded-full text-md px-5"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex gap-3 mt-5">
          <Button
            onClick={() => push("/auth/register")}
            classname="rounded-full text-md px-5"
          >
            Join Us
          </Button>
          <Button
            onClick={() => push("/auth/login")}
            variant="secondary"
            classname="rounded-full text-md px-5"
          >
            Sign In
          </Button>
        </div>
      )}

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

export default Drawer;
