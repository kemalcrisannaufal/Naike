/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Proptypes = {
  type: "login" | "register";
  title: string;
  children: React.ReactNode;
  link: string;
};
const AuthLayout = (props: Proptypes) => {
  const { type, title, children, link } = props;
  return (
    <div className="flex lg:flex-row flex-col lg:p-5 pt-20 w-full h-screen">
      <div className="flex flex-col justify-center items-center lg:w-1/2">
        <img
          src="/assets/images/auth/yacht.svg"
          alt="Yacht"
          className="w-40 lg:w-80 h-40 lg:h-80"
        />
        <div className="hidden lg:block text-center">
          <p className="font-semibold text-neutral-700 text-lg">
            Belanja Hanya di Crisorca
          </p>
          <p className="mt-2 font-medium text-md text-neutral-600">
            Gabung dan rasakan kemudahan bertransaksi di Crisorca
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center lg:w-1/2">
        <div className="lg:shadow-lg p-5 lg:border border-neutral-200 rounded-lg w-full max-w-md">
          <div className="text-center">
            <h1 className="font-semibold text-md text-neutral-700 md:text-lg">
              {title}
            </h1>
            <p className="font-medium text-neutral-700 lg:text-md text-xs md:text-sm">
              {type === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link href={link} className="font-semibold text-primary">
                {type === "login" ? " Register" : " Login"}
              </Link>
            </p>
          </div>

          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
