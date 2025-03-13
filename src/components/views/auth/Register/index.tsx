import { useRouter } from "next/router";
import { FormEvent, useState, Dispatch, SetStateAction } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/Auth";
import { authServices } from "@/services/auth";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<object>>;
};

const RegisterView = (props: Proptypes) => {
  const { setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      password: form.password.value,
      phone: form.phone.value,
    };

    try {
      const result = await authServices.registerAccount(data);
      if (result.status == 200) {
        setIsLoading(false);
        form.reset();
        push("/auth/login");
      } else {
        setIsLoading(false);
        setToaster({
          variant: "error",
          message: "Email already exist. Please try again",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Email already exist. Please try again",
      });
      console.log(error);
    }
  };

  return (
    <>
      <AuthLayout type="register" title="Sign Up" link="/auth/login">
        {" "}
        <form onSubmit={handleSubmit}>
          <Input
            label="Fullname"
            name="fullname"
            type="text"
            placeholder="John Doe"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="johndoe@example.com"
          />
          <Input
            label="Phone"
            name="phone"
            type="number"
            placeholder="08123456789"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="password"
          />

          <Button type="submit" classname="w-full">
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </AuthLayout>
    </>
  );
};

export default RegisterView;
