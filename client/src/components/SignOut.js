import auth from "../services/auth";
import register from "../services/register";

const SignOut = (props) => {
  const signOutProcess = () => {
    register.removeJWT();
    auth.logout(() => props.history.push("/"));
  }

  return (
    <>
      { signOutProcess() }
    </>
  );
}

export default SignOut;
