/* eslint-disable @typescript-eslint/no-explicit-any */

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/Auth";

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
    <>
      <AuthLayout
        type="login"
        title="Masuk"
        error={error}
        link="/auth/register"
      >
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="johndoe@example"
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="password"
          />
          <div>
            <Button type="submit" classname="w-full">
              {isLoading ? "Memuat..." : "Masuk"}
            </Button>
            <hr className="my-2 text-neutral-300" />
            <Button
              type="button"
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              classname="w-full"
            >
              {" "}
              <i className="bx bxl-google text-lg" />
              Login With Google
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default LoginView;
