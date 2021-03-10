import React from 'react';
import '../css/createform.css';
import restService from "../services/restService";
import validation from "../validations/validation";
import { schemaHomework } from "../validations/schemas";

class CreateForm extends React.Component {

  state = {
    homework: {
      title: '',
      score: '',
      due_date: '',
      school: {
        name: '',
        address: '',
        logo: '',
      },
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    //validation check
    const valResult = validation.validate(schemaHomework, this.state.homework);
    if(valResult) {
      this.setState(valResult);
      return;
    }

    restService.createHomework(this.state.homework, result => {
      if(!result) {
        alert("Create a homework is failed!!!");
        return;
      }

      // alert("Create a homework successfully!!!");
      this.props.history.push("/");
    });
  }

  handleChange = (e) => {
    //updating our state with the change in form field
    const { name, value } = e.target; //destructuring
    const homework = { ...this.state.homework } ;

    if( name === "title" || name === "score" || name === "due_date" ){
      homework[name] = value;
    } else {
      homework.school[name] = value;
    }

    this.setState({ homework } );
  }

  render()
  {
    return (
      <form className="form-create" onSubmit={ this.handleSubmit }>
        <h1 className="h3 mb-3 font-weight-normal text-center">Please Create New Homework</h1>

        <label htmlFor="inputTitle" className="sr-only">Title</label>
        <input onChange={ this.handleChange } name="title" type="text" id="inputTitle" className="form-control" placeholder="Final Assignment" required autoFocus />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "title") }</span>

        <label htmlFor="inputScore" className="sr-only">Score</label>
        <input onChange={ this.handleChange } name="score" type="text" id="inputScore" className="form-control" placeholder="100" required />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "score") }</span>

        <label htmlFor="inputDueDate" className="sr-only">Due Date</label>
        <input onChange={ this.handleChange } name="due_date" type="date" id="inputDueDate" className="form-control" required />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "due_date") }</span>

        <label htmlFor="inputSchoolName" className="sr-only">School Name</label>
        <input onChange={ this.handleChange } name="name" type="text" id="inputSchoolName" className="form-control" placeholder="Amazing high school" required />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "school.name") }</span>

        <label htmlFor="inputSchoolAddress" className="sr-only">School Address</label>
        <input onChange={ this.handleChange } name="address" type="text" id="inputSchoolAddress" className="form-control" placeholder="Halifax, N.S." required />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "school.address") }</span>

        <label htmlFor="inputSchoolLogo" className="sr-only">School Logo URL</label>
        <input onChange={ this.handleChange } name="logo" type="text" id="inputSchoolLogo" className="form-control" placeholder="http:\\Logo.com" required />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "school.logo") }</span>

        <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
      </form>
    );
  }

}

export default CreateForm;