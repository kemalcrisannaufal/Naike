/* eslint-disable @typescript-eslint/no-explicit-any */
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import NavButton from "./NavButton";
import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Text/Title";
import Drawer from "./Drawer";

const Navbar = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [aboutUsModal, setAboutUsModal] = useState(false);
  const session: any = useSession();
  const router = useRouter();

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const menu = [
    {
      label: "Home",
      url: "/",
      disabled: false,
    },
    {
      label: "Products",
      url: "/products",
      disabled: false,
    },
    {
      label: "Men",
      url: "/products",
      disabled: true,
    },
    {
      label: "Women",
      url: "/products",
      disabled: true,
    },
  ];

  return (
    <>
      <div className="top-0 z-50 sticky">
        {/* Topbar */}
        <div className="hidden md:block bg-neutral-200 px-5 py-1 justify">
          <ul className="flex justify-end gap-5">
            <li>
              <button
                className="cursor-pointer"
                onClick={() => setAboutUsModal(true)}
              >
                <p className="font-medium text-xs">About Us</p>
              </button>
            </li>
            <li>
              <button
                className="cursor-pointer"
                onClick={() => (session.data ? signOut() : signIn())}
              >
                <p className="font-medium text-xs">
                  {session.data ? "Logout" : "Sign In"}
                </p>
              </button>
            </li>
          </ul>
        </div>

        {/* Navbar */}
        <div className="flex justify-between items-center bg-white shadow-lg px-5 w-full h-12 md:h-14">
          {/* Logo */}
          <div className="flex justify-start items-center lg:w-1/6">
            <button
              type="button"
              className="focus:outline-none h-6 overflow-hidden cursor-pointer"
              onClick={() => router.push("/")}
            >
              <Image
                src="/assets/images/naike/logo.png"
                alt="Naike"
                className="w-full h-full object-contain"
                width={200}
                height={200}
                priority
              />
            </button>
          </div>

          {/* Menu */}
          <div className="hidden md:flex md:justify-center md:w-2/3">
            <ul className="flex justify-center gap-5 w-full">
              {menu.map(
                (
                  item: { label: string; url: string; disabled: boolean },
                  index: number
                ) => {
                  return (
                    <li key={index}>
                      <button
                        className={`focus:outline-none hover:text-neutral-500 ${
                          router.pathname === item.url
                            ? "font-bold"
                            : "font-normal text-neutral-600"
                        } ${
                          item.disabled
                            ? "text-neutral-500 cursor-not-allowed"
                            : " cursor-pointer"
                        }`}
                        onClick={() => router.push(item.url)}
                      >
                        <p className="font-medium text-md">{item.label}</p>
                      </button>
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-row-reverse items-center gap-2 w-1/6">
            <div className="flex justify-end items-center gap-1 md:gap-2">
              <NavButton iconClass="bx-heart" onClick={() => {}} />
              <NavButton
                iconClass="bx-shopping-bag"
                onClick={() => {
                  return session.status === "authenticated"
                    ? router.push("/cart")
                    : router.push(`/auth/login?callbackUrl=/cart`);
                }}
              />
              <button
                className={`flex items-center gap-2 hover:bg-neutral-200 px-2 py-1 rounded-full transition-all duration-100 ease-in-out cursor-pointer ${
                  session.data && "border border-neutral-200"
                }`}
                onClick={() => router.push("/member/profile")}
              >
                <i className={`text-neutral-800 text-2xl bx bx-user`} />
                {session.data && (
                  <p className="font-medium text-neutral-700 text-sm">
                    {session.data?.user.fullname.split(" ")[0]}
                  </p>
                )}
              </button>

              {/* Mobile menu */}
              <NavButton
                iconClass="bx-menu"
                classname="lg:hidden"
                onClick={toggleDrawer}
              />
            </div>
          </div>
        </div>
      </div>

      {aboutUsModal && (
        <Modal onClose={() => setAboutUsModal(false)}>
          <Title variant="small">About Naike</Title>
          <p className="mt-2">
            Naike is a learning project inspired by Nike, crafted to explore web
            development, design principles, and responsive user experiences.
          </p>
        </Modal>
      )}

      {/* Sidebar Mobile  */}
      {isDrawerVisible && (
        <Drawer menu={menu} onclose={toggleDrawer} session={session} />
      )}
    </>
  );
};

export default Navbar;
