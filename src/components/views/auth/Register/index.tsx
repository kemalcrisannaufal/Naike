import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/Auth";
import { authServices } from "@/services/auth";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
        setError("Email sudah terdaftar");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email sudah terdaftar");
      console.log(error);
    }
  };

  return (
    <>
      <AuthLayout
        type="register"
        title="Daftar"
        link="/auth/login"
        error={error}
      >
        {" "}
        <form onSubmit={handleSubmit}>
          <Input
            label="Nama Lengkap"
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
            label="Nomor Handphone"
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
            {isLoading ? "Memuat..." : "Daftar"}
          </Button>
        </form>
      </AuthLayout>
    </>
  );
};

export default RegisterView;
