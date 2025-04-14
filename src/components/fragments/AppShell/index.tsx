import { useRouter } from "next/router";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import Toaster from "@/components/ui/Toaster";
import { ToasterType } from "@/types/toaster.type";

type Proptypes = {
  children: React.ReactNode;
};

const AppShell = (props: Proptypes) => {
  const { children } = props;
  const disabledNavbar = ["auth", "admin"];
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);

  return (
    <>
      {!disabledNavbar.includes(pathname.split("/")[1]) && <Navbar />}
      {children}
      {Object.keys(toaster).length > 0 && <Toaster />}
      {!disabledNavbar.includes(pathname.split("/")[1]) && <Footer />}
    </>
  );
};

export default AppShell;
