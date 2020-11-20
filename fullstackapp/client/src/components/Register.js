import React from 'react';
import '../css/register.css';
import Axios from "axios";

class Register extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //submit data to the api
    console.log(this.state);

    Axios.post(
      'http://localhost:5000/api/users/register',
      this.state
    ).then(
      response => {
        console.log(response);

        //register was successful
        console.log(response.headers['x-auth-token']);

        //for dev purposes only.....
        localStorage.setItem('RegisterToken', response.headers['x-auth-token']);
        //localStorage.getItem('token');

        //redirect to the homepage or some page that sent us here
        //console.log(this.props.history);
        //this.props.history.push('/');
      }
    ).catch(
      error => console.log(error.response)
    )
  }

  handleChange = (e) => {
    //updating our state with the change in form field
    const { name, value } = e.target; //destructuring

    this.setState({ [name]: value });
  }

  render()
  {
    return (
      <form className="form-register" onSubmit={ this.handleSubmit }>
        <h1 className="h3 mb-3 font-weight-normal text-center">Please Register</h1>

        <label htmlFor="inputFirstname" className="sr-only">Firstname</label>
        <input onChange={ this.handleChange } name="firstName" type="text" id="inputFirstname" className="form-control" placeholder="Firstname" required autoFocus />

        <label htmlFor="inputLastname" className="sr-only">Lastname</label>
        <input onChange={ this.handleChange } name="lastName" type="lastname" id="inputLastname" className="form-control" placeholder="Lastname" required />

        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input onChange={ this.handleChange } name="email" type="email" id="inputEmail" className="form-control" placeholder="Email address" required />

        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input onChange={ this.handleChange } name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      </form>
    );
  }
}

export default Register;