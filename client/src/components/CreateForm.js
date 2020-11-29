import React from 'react';
import '../css/createform.css';
import Axios from "axios";
class CreateForm extends React.Component {

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

  handleSubmit = (e) => {
    e.preventDefault();

    //submit data to the api
    console.log(this.state);

    //get token
    const homeworkToken = localStorage.getItem('HomeworkToken');
    console.log(homeworkToken);

    //make axios data
    const createHeader = {
      headers: {
        "x-auth-token": homeworkToken,
        "content-type": "application/json"
      }
    };

    const createData = {
      "subject": {
        "teacher_name": {
          "first": "Subject",
          "last": "Teacher"
        },
        "title": "New subject title"
      },
      "semester": {
        "year": 2020,
        "name": "New Semester"
      },
      "school": {
        "name": this.state.school.name,
        "address": this.state.school.address,
        "logo": this.state.school.logo
      },
      "title": this.state.title,
      "score": this.state.score,
      "due_date": this.state.due_date,
      "submit": [
        {
          "seq_no": 1,
          "title": "New Submit 1",
          "text_content": "New Submit Text Content 1"
        },
        {
          "seq_no": 2,
          "title": "New Submit 2",
          "text_content": "New Submit Text Content 2"
        },
        {
          "seq_no": 3,
          "title": "New Submit 3",
          "text_content": "New Submit Text Content 3"
        }
      ],
      "progress": 0
    };

    console.log(createData);

    Axios.post(
      'http://localhost:5000/api/homeworks',
      createData,
      createHeader
    ).then(
      response => {
        console.log(response);
      }
    ).catch(
      error => console.log(error.response)
    )
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
      <form className="form-create" onSubmit={ this.handleSubmit }>
        <h1 className="h3 mb-3 font-weight-normal text-center">Please Create New Homework</h1>

        <label htmlFor="inputTitle" className="sr-only">Title</label>
        <input onChange={ this.handleChange } name="title" type="text" id="inputTitle" className="form-control" placeholder="Final Assignment" required autoFocus />

        <label htmlFor="inputScore" className="sr-only">Score</label>
        <input onChange={ this.handleChange } name="score" type="text" id="inputScore" className="form-control" placeholder="100" required />

        <label htmlFor="inputDueDate" className="sr-only">Due Date</label>
        <input onChange={ this.handleChange } name="due_date" type="date" id="inputDueDate" className="form-control" required />

        <label htmlFor="inputSchoolName" className="sr-only">School Name</label>
        <input onChange={ this.handleChange } name="name" type="text" id="inputSchoolName" className="form-control" placeholder="Amazing high school" required />

        <label htmlFor="inputSchoolAddress" className="sr-only">School Address</label>
        <input onChange={ this.handleChange } name="address" type="text" id="inputSchoolAddress" className="form-control" placeholder="Halifax, N.S." required />

        <label htmlFor="inputSchoolLogo" className="sr-only">School Logo URL</label>
        <input onChange={ this.handleChange } name="logo" type="text" id="inputSchoolLogo" className="form-control" placeholder="http:\\Logo.com" required />

        <button className="btn btn-lg btn-primary btn-block" type="submit">Create</button>
      </form>
    );
  }

}

export default CreateForm;