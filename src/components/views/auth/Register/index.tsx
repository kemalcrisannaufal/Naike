import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/Auth";
import { authServices } from "@/services/auth";
import { ToasterContext } from "@/contexts/ToasterContext";

const RegisterView = () => {
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;

    if (form.password.value === form.password_confirmation.value) {
      const data = {
        email: form.email.value,
        fullname: form.fullname.value,
        password: form.password.value,
        phone: form.phone.value,
      };

      if (data.email && data.fullname && data.password && data.phone) {
        if (data.password.length < 8) {
          setToaster({
            variant: "error",
            message: "Password must be at least 8 characters",
          });
        } else {
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
        }
      } else {
        setIsLoading(false);
        setToaster({
          variant: "error",
          message: "Please fill all the fields",
        });
      }
    } else {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Password and password confirmation do not match",
      });
    }
  };

  return (
    <>
      <AuthLayout type="register" title="Sign Up" link="/auth/login">
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
            forPassword={true}
          />
          <Input
            label="Password Confirmation"
            name="password_confirmation"
            type="password"
            placeholder="password"
            forPassword={true}
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
