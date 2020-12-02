import authService from "../services/authService";

const SignOut = (props) => {
  const signOutProcess = () => {
    authService.logout(() => props.history.push("/"));
  }

  return (
    <>
      { signOutProcess() }
    </>
  );
}

export default SignOut;
