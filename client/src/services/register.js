import Axios from "axios";

class register {
  storageNameForToken = "HomeworkToken";
  createHomeworkURL = "http://localhost:5000/api/homeworks";

  setJWT(token) {
    localStorage.setItem(this.storageNameForToken, token);
  }

  getJWT() {
    return localStorage.getItem(this.storageNameForToken);
  }

  removeJWT() {
    localStorage.removeItem(this.storageNameForToken);
  }

  createHomework(data) {
    //get token
    const homeworkToken = this.getJWT();
    // console.log(homeworkToken);

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
        "name": data.school.name,
        "address": data.school.address,
        "logo": data.school.logo
      },
      "title": data.title,
      "score": data.score,
      "due_date": data.due_date,
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
    // console.log(createData);

    //call post API
    return Axios.post(
      this.createHomeworkURL,
      createData,
      createHeader
    ).then(
      response => {
        // console.log(response);
        return response;
      }
    ).catch(
      error => console.log(error.response)
    )
  }

}

export default new register();