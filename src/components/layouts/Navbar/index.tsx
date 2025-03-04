import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="w-full bg-indigo-700 h-12 flex justify-end items-center px-5 fixed">
      <button onClick={() => (data ? signOut() : signIn())} className="bg-indigo-800 text-white px-5 py-3 cursor-pointer">
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
