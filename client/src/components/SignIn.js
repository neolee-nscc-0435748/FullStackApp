import React from 'react';
import '../css/signin.css';

import authService from "../services/authService";
import validation from "../validations/validation";
import { schemaSignIn } from "../validations/schemas";

class SignIn extends React.Component {

  state = {
    email: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    //validation check
    const valResult = validation.validate(schemaSignIn, this.state);
    if(valResult) {
      this.setState(valResult);
      return;
    }

    //sign in
    authService.login(this.state, result => {
      if(!result){
        alert("Login is failed!\nPlease try it again");
        return;
      }

      this.props.history.push("/");
    });
  }

  handleChange = (e) => {
    //updating our state with the change in form field
    const { type, value } = e.target; //destructuring

    this.setState({ [type]: value });
  }

  render()
  {
    return (
        <form className="form-signin" onSubmit={ this.handleSubmit }>
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input onChange={ this.handleChange } type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
            <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "email") }</span>

            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input onChange={ this.handleChange } type="password" id="inputPassword" className="form-control" placeholder="Password" required />
            <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "password") }</span>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
     );
  }
}
 
export default SignIn;