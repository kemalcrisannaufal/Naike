import RegisterView from "@/components/views/auth/Register";
import Head from "next/head";

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <RegisterView />
    </>
  );
};

export default RegisterPage;
