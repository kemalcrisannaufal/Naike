import RegisterView from "@/components/views/Auth/Register";
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
