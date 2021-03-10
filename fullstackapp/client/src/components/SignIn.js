import React from 'react';
import '../css/signin.css';
import Axios from "axios";

class SignIn extends React.Component {

  state = {
    email: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();

    //submit data to the api
    console.log(this.state);

    Axios.post(
      'http://localhost:5000/api/users/login',
      this.state
    ).then(
        response => {
          console.log(response);

          //login was successful
          console.log(response.headers['x-auth-token']);

          //for dev purposes only.....
          localStorage.setItem('SignInToken', response.headers['x-auth-token']);
          //localStorage.getItem('token');

          //redirect to the homepage or some page that sent us here
          console.log(this.props.history);
          this.props.history.push('/');


          //xss - cross site scripting

          //Where can we store this???
          //as state - in our application -> secure / requires many logins
          //local storage -> not that secure
          //cookie(httpOnly) -> more secure than localStorage -> can still be accessed by hackers

          //refresh tokens

          //Auth0 - okta

        }
    ).catch(
      error => console.log(error.response)
    )
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
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input onChange={ this.handleChange } type="password" id="inputPassword" className="form-control" placeholder="Password" required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
     );
  }
}
 
export default SignIn;