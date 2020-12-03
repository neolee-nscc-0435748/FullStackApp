import Axios from 'axios';

class RestService {
  constructor() {
    this.storageItemForToken = "HomeworkToken";
    this.baseURL = process.env.REACT_APP_API_URL;
  }

  //handling token
  getToken() {
    return localStorage.getItem(this.storageItemForToken);
  }

  setToken(token) {
    localStorage.setItem(this.storageItemForToken, token);
  }

  removeToken() {
    localStorage.removeItem(this.storageItemForToken);
  }

  //handling authentication
  login(credentials, cb) {
    Axios.post(
      `${this.baseURL}/users/login`,
      credentials
    ).then(
      response => {
        //login was successful
        console.log(response);
        this.setToken(response.headers['x-auth-token']);  //for dev purposes only.....(localstorage is not safe in security reason
        cb(true);
      }
    ).catch((error) => {
        console.log(error.response);
        cb(false);
      }
    )
  }

  //handling REST API
  createUser(data, cb) {
    Axios.post(
      `${this.baseURL}/users/register`,
      data
    ).then(
      response => {
        //register was successful
        console.log(response);
        this.setToken(response.headers['x-auth-token']);  //for dev purposes only.....(localstorage is not safe in security reason
        cb(true);
      }
    ).catch(
      error => {
        console.log(error.response);
        cb(false);
      }
    )
  }

  getHomeworks(cb) {
    Axios
      .get(`${this.baseURL}/homeworks`)
      .then(response => {
        // console.log(response.data);
        cb(response.data, null);
      })
      .catch(error => {
        console.log(error.response);
        cb(null, error);
      });
  }

  getHomework(id, cb) {
    Axios
      .get(`${this.baseURL}/homeworks/${id}`)
      .then(response => {
        // console.log(response.data);
        cb(response.data, null);
      })
      .catch(error => {
        console.log(error.response);
        cb(null, error);
      });
  }

  createHomework(data, cb) {
    //make axios data
    const createHeader = {
      headers: {
        "x-auth-token": this.getToken(),
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
      `${this.baseURL}/homeworks`,
      createData,
      createHeader
    ).then(
      response => {
        // console.log(response);
        cb(true);
      }
    ).catch(
      error => {
        console.log(error.response);
        cb(false);
      }
    );
  }

  updateHomework(id, data, cb) {
    //make axios data
    const createHeader = {
      headers: {
        "x-auth-token": this.getToken(),
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
    return Axios.put(
      `${this.baseURL}/homeworks/${id}`,
      createData,
      createHeader
    ).then(
      response => {
        // console.log(response);
        cb(true);
      }
    ).catch(
      error => {
        console.log(error.response);
        cb(false);
      }
    );
  }

  deleteHomework(id, cb) {
    //make axios data
    const createHeader = {
      headers: {
        "x-auth-token": this.getToken(),
        "content-type": "application/json"
      }
    };

    Axios
      .delete(`${this.baseURL}/homeworks/${id}`,
        createHeader )
      .then(response => {
        // console.log(response.data);
        cb(true);
      })
      .catch(error => {
        console.log(error.response);
        cb(false);
      });
  }

}

export default new RestService();