/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email atau password salah");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email atau password salah");
      console.log(error);
    }
  };
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
              Masuk
            </h1>
            <p className="text-xs md:text-sm lg:text-md text-neutral-700 font-medium">
              Belum punya akun Crisorca?{" "}
              <Link
                href={"/auth/register"}
                className="font-semibold text-indigo-700"
              >
                Daftar
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 mb-3">
                <label
                  htmlFor="email"
                  className="text-xs lg:text-sm text-neutral-600 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="w-full border border-neutral-300 rounded p-2 text-neutral-600 focus:outline-none focus:border-neutral-600"
                  id="email"
                  name="email"
                />
              </div>

              <div className="flex flex-col gap-2 mb-3">
                <label
                  htmlFor="password"
                  className="text-xs lg:text-sm text-neutral-600 font-semibold"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="w-full border border-neutral-300 rounded p-2 text-neutral-600 focus:outline-none focus:border-neutral-600"
                  id="password"
                  name="password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-700 text-white font-semibold rounded p-2 cursor-pointer text-sm lg:text-md"
                >
                  {isLoading ? "Memuat..." : "Masuk"}
                </button>

                <hr className="my-2 text-neutral-300" />

                <button
                  type="button"
                  onClick={() =>
                    signIn("google", { callbackUrl, redirect: false })
                  }
                  className="w-full bg-indigo-700 text-white font-semibold rounded p-2 cursor-pointer text-sm lg:text-md flex items-center justify-center gap-2"
                >
                  <i className="bx bxl-google text-lg" />
                  Login With Google
                </button>
              </div>
              <div>
                {error && (
                  <p className="mt-3 text-center text-sm text-red-500">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
