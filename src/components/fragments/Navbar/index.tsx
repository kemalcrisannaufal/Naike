/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

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

  return (
    <div>
      <div className="flex flex-row-reverse bg-neutral-200 px-5 py-2">
        <ul className="flex gap-5">
          <li className="font-medium text-sm">
            <button>About Us</button>
          </li>
          <li className="font-medium text-sm">
            <button>Sign In</button>
          </li>
        </ul>
      </div>
      {/* Navbar */}
      <div className="top-0 z-50 sticky flex justify-between items-center bg-white shadow-lg px-5 w-full h-12 md:h-16">
        <button
          type="button"
          className="h-6 overflow-hidden cursor-pointer h"
          onClick={() => router.push("/")}
        >
          <Image
            src="/assets/images/naike-high-resolution-logo.png"
            alt="Crisorca Logo"
            className="w-full h-full object-cover"
            width={500}
            height={500}
            priority
          />
        </button>

        {/* Dropdown button */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            classname="flex items-center gap-2 p-1 rounded hover:bg-neutral-200 transition-all ease-in-out duration-100"
            onClick={toggleDropdown}
          >
            <i className="text-xl md:text-3xl bx bx-menu" />
          </Button>

          {/* Dropdown menu */}
          <div
            className={`fixed top-15 right-3 w-40  rounded shadow-lg ${
              isDropdownVisible ? "block" : "hidden"
            }`}
            ref={dropdownRef}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/member/profile")}
              classname="w-full"
            >
              <i className="text-xl bx bx-user" />
              <span>Profile</span>
            </Button>
            <Button
              type="button"
              onClick={() => (session.data ? signOut() : signIn())}
              variant="secondary"
              classname="w-full"
            >
              {session.data ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
