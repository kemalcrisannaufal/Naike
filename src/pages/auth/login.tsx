import LoginView from "@/components/views/auth/Login";
import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<object>>;
};

const LoginPage = (props: Proptypes) => {
  const { setToaster } = props;
  return (
    <>
      <LoginView setToaster={setToaster} />
    </>
  );
};

export default LoginPage;
