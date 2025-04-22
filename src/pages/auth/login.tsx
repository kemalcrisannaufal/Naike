import LoginView from "@/components/views/Auth/Login";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginView />
    </>
  );
};

export default LoginPage;
