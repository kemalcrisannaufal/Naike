import RegisterView from "@/components/views/auth/Register";
import { Dispatch, SetStateAction } from "react";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<object>>;
};

const RegisterPage = (props: Proptypes) => {
  const { setToaster } = props;
  return (
    <>
      <RegisterView setToaster={setToaster} />
    </>
  );
};

export default RegisterPage;
