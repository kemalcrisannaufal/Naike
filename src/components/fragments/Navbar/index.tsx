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
    <nav className="w-full h-14 bg-white shadow-lg flex justify-between items-center px-5 sticky top-0 z-100">
      <button
        type="button"
        className="h-10 overflow-hidden cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/assets/images/crisorca-logo-removebg.png"
          alt="Crisorca Logo"
          className="w-auto h-full object-contain"
          width={100}
          height={100}
        />
      </button>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          classname="flex items-center gap-2 p-1 rounded hover:bg-gray-200 transition-all ease-in-out duration-100"
          onClick={toggleDropdown}
        >
          <i className="bx bx-menu text-xl md:text-3xl" />
        </Button>
        <div
          className={`fixed top-15 right-3 w-40 bg-white rounded shadow-lg ${
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
            <i className="bx bx-user text-xl" />
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
    </nav>
  );
};

export default Navbar;
