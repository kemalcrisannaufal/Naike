/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import NavButton from "./NavButton";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const session: any = useSession();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const menu = [
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
    {
      label: "Accessories",
      url: "/products",
      disabled: true,
    },
  ];

  return (
    <div className="top-0 z-50 sticky">
      {/* Topbar */}
      <div className="hidden md:block bg-neutral-200 px-5 py-1 justify">
        <ul className="flex justify-end gap-5">
          <li>
            <button className="cursor-pointer">
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
      <div className="flex justify-between items-center bg-white shadow-lg px-2 md:px-5 w-full h-12 md:h-14">
        {/* Logo */}
        <div className="flex justify-start items-center w-1/6">
          <button
            type="button"
            className="focus:outline-none h-6 overflow-hidden cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/assets/images/naike-high-resolution-logo.png"
              alt="Crisorca Logo"
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
                      className={`focus:outline-none hover:text-neutral-500  ${
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
          <div className="hidden md:flex justify-end items-center md:gap-2">
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
              className="flex items-center gap-2 hover:bg-neutral-200 px-2 py-1 border border-neutral-200 rounded-full transition-all duration-100 ease-in-out cursor-pointer"
              onClick={() => router.push("/member/profile")}
            >
              <i
                className={`text-neutral-600 text-lg md:text-2xl bx bx-user`}
              />
              {session.data && (
                <p className="font-medium text-neutral-700 text-sm">
                  {session.data?.user.fullname.split(" ")[0]}
                </p>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          <Button
            type="button"
            variant="secondary"
            classname="block md:hidden p-1 rounded hover:bg-neutral-200 transition-all ease-in-out duration-100 border-none"
            onClick={toggleDropdown}
          >
            <i className="text-lg md:text-3xl bx bx-menu" />
          </Button>

          {/* Dropdown menu */}
          <div
            className={`fixed top-14 right-3 w-40  rounded shadow-lg ${
              isDropdownVisible ? "block" : "hidden"
            }`}
            ref={dropdownRef}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/member/profile")}
              classname="w-full rounded-none"
            >
              <i className="text-neutral-700 text-xl bx bx-user" />
              <p className="text-neutral-700">Profile</p>
            </Button>
            <Button
              type="button"
              onClick={() => (session.data ? signOut() : signIn())}
              variant="secondary"
              classname="w-full rounded-none"
            >
              <p className="text-neutral-700 text-sm">
                {session.data ? "Logout" : "Login"}
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
