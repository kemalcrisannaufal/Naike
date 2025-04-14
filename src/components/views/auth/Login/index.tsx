import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/Auth";
import { ToasterContext } from "@/contexts/ToasterContext";

const LoginView = () => {
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const callbackUrl =
    typeof query.callbackUrl === "string" ? query.callbackUrl : "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    if (form.email.value && form.password.value) {
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
    } else {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Please fill all the fields",
      });
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
              <i className="text-lg bx bxl-google" />
              Login With Google
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};

export default LoginView;
