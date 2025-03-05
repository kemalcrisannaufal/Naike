/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type Proptypes = {
  type: "login" | "register";
  title: string;
  children: React.ReactNode;
  error: string;
  link: string;
};
const AuthLayout = (props: Proptypes) => {
  const { type, title, children, link, error } = props;
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row p-5 pt-20 lg:p-5">
      <div className="lg:w-1/2 flex flex-col justify-center items-center">
        <img
          src="/assets/images/auth/yacht.svg"
          alt="Yacht"
          className="h-40 w-40 lg:h-80 lg:w-80"
        />
        <div className="hidden lg:block text-center">
          <p className="text-lg font-semibold text-neutral-700">
            Belanja Hanya di Crisorca
          </p>
          <p className="mt-2 text-md font-medium text-neutral-600">
            Gabung dan rasakan kemudahan bertransaksi di Crisorca
          </p>
        </div>
      </div>

      <div className="lg:w-1/2 flex flex-col justify-center items-center">
        <div className="max-w-md w-full rounded-lg lg:border border-neutral-100 lg:shadow-lg p-5">
          <div className="text-center">
            <h1 className="text-md md:text-lg text-neutral-700 font-semibold">
              {title}
            </h1>
            <p className="text-xs md:text-sm lg:text-md text-neutral-700 font-medium">
              {type === "login"
                ? "Belum punya akun Crisorca?"
                : "Sudah punya akun Crisorca?"}
              <Link href={link} className="font-semibold text-indigo-700">
                {type === "login" ? " Daftar" : " Masuk"}
              </Link>
            </p>
          </div>

          <div className="mt-5">
            {children}
            <div>
              {error && (
                <p className="mt-3 text-center text-sm text-red-500">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
