import React from 'react';
import '../css/register.css';
import authService from "../services/authService";
import validation from "../validations/validation";
import { schemaRegister } from "../validations/schemas";

class Register extends React.Component {

  state = {
    registerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    //validation check
    const valResult = validation.validate(schemaRegister, this.state.registerInfo);
    if(valResult) {
      this.setState(valResult);
      return;
    }

    //register new user
    authService.register(this.state.registerInfo, result => {
      if(!result){
        alert("New user register is failed!");
        return;
      }

      this.props.update();
      this.props.history.push("/");
    });
  }

  handleChange = (e) => {
    //updating our state with the change in form field
    const { name, value } = e.target; //destructuring
    const registerInfo = { ...this.state.registerInfo } ;
    registerInfo[name] = value;

    this.setState({ registerInfo });
  }

  render()
  {
    return (
      <form className="form-register" onSubmit={ this.handleSubmit }>
        <h1 className="h3 mb-3 font-weight-normal text-center">Please Register</h1>

        <label htmlFor="inputFirstname" className="sr-only">Firstname</label>
        <input onChange={ this.handleChange } name="firstName" type="text" id="inputFirstname" className="form-control" placeholder="Firstname" required autoFocus />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "firstName") }</span>

        <label htmlFor="inputLastname" className="sr-only">Lastname</label>
        <input onChange={ this.handleChange } name="lastName" type="lastname" id="inputLastname" className="form-control" placeholder="Lastname" required />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "lastName") }</span>

        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input onChange={ this.handleChange } name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "email") }</span>

        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input onChange={ this.handleChange } name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "password") }</span>

        <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      </form>
    );
  }

}

export default Register;