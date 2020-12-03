import React from 'react';
import '../css/editform.css';
import restService from "../services/restService";
import validation from "../validations/validation";
import { schemaHomework } from "../validations/schemas";

class EditForm extends React.Component {

  state = {
    title: '',
    score: '',
    due_date: '',
    school: {
      name: '',
      address: '',
      logo: '',
    },
  };

  componentDidMount() {
    console.log(this.props);

    //Get all homework data
    restService.getHomework( this.props.location.aboutProps._id, (data, error) => {
      if(error){
        alert(`Get homework with id:${this.props.location.aboutProps._id} failed!`);
        return;
      }

      this.setState({
        title: data.title,
        score: data.score,
        due_date: data.due_date.substr(0, 10),
        school: {
          name: data.school.name,
          address: data.school.address,
          logo: data.school.logo,
      }});

      console.log(this.state);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    //validation check
    const valResult = validation.validate(schemaHomework, this.state);
    if(valResult) {
      this.setState(valResult);
      return;
    }

    restService.updateHomework(this.props.location.aboutProps._id, this.state, result => {
      if(!result) {
        alert("Edit a homework is failed!!!");
        return;
      }

      alert("Edit a homework successfully!!!");
      this.props.history.push("/");
    });
  }

  handleChange = (e) => {
    //updating our state with the change in form field
    const { name, value } = e.target; //destructuring

    if( name === "title" || name === "score" || name === "due_date" )
    {
      this.setState({
          [name]: value
        }
      );
    }
    else
    {
      this.setState(prevState => (
        {
          school: {
          ...prevState.school,
              [name]: value
          }
        }
      ));
    }
  }

  render()
  {
    return (
      <form className="form-edit" onSubmit={ this.handleSubmit }>
        <h1 className="h3 mb-3 font-weight-normal text-center">Please Edit Homework</h1>

        <label htmlFor="inputTitle" className="sr-only">Title</label>
        <input onChange={ this.handleChange } name="title" type="text" id="inputTitle" className="form-control" placeholder="Final Assignment" required autoFocus value={this.state.title} />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "title") }</span>

        <label htmlFor="inputScore" className="sr-only">Score</label>
        <input onChange={ this.handleChange } name="score" type="text" id="inputScore" className="form-control" placeholder="100" required  value={this.state.score} />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "score") }</span>

        <label htmlFor="inputDueDate" className="sr-only">Due Date</label>
        <input onChange={ this.handleChange } name="due_date" type="date" id="inputDueDate" className="form-control" required  value={this.state.due_date} />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "due_date") }</span>

        <label htmlFor="inputSchoolName" className="sr-only">School Name</label>
        <input onChange={ this.handleChange } name="name" type="text" id="inputSchoolName" className="form-control" placeholder="Amazing high school" required  value={this.state.school.name} />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "school.name") }</span>

        <label htmlFor="inputSchoolAddress" className="sr-only">School Address</label>
        <input onChange={ this.handleChange } name="address" type="text" id="inputSchoolAddress" className="form-control" placeholder="Halifax, N.S." required  value={this.state.school.address} />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "school.address") }</span>

        <label htmlFor="inputSchoolLogo" className="sr-only">School Logo URL</label>
        <input onChange={ this.handleChange } name="logo" type="text" id="inputSchoolLogo" className="form-control" placeholder="http:\\Logo.com" required  value={this.state.school.logo} />
        <span style={{color: "red"}}>{ validation.getErrorMsg(this.state.error, "school.logo") }</span>

        <button className="btn btn-lg btn-primary btn-block" type="submit">Edit</button>
      </form>
    );
  }

}

export default EditForm;