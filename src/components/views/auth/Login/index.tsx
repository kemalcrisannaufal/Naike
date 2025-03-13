/* eslint-disable @typescript-eslint/no-explicit-any */

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/Auth";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<any>>;
};

const LoginView = (props: Proptypes) => {
  const { setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
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
        setToaster({
          variant: "success",
          message: "Login success",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "error",
          message: "Email or password is incorrect",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Login failed, please try again later",
      });

      console.log(error);
    }
  };
  return (
    <>
      <AuthLayout type="login" title="Sign In" link="/auth/register">
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
              {isLoading ? "Loading..." : "Login"}
            </Button>
            <hr className="my-2 text-neutral-300" />
            <Button
              type="button"
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              classname="w-full"
            >
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
