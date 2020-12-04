import React from 'react';
import '../css/main.css';
import 'font-awesome/css/font-awesome.min.css';
import Card from "./Card";
import restService from "../services/restService";

class Main extends React.Component {

  state = {
    homeworks: [],
  }

  componentDidMount() {
    this.searchHomeworks();
  }

  searchHomeworks = () => {
    let searchWord = document.getElementById("search").value;

    //Get all homework data
    restService.getHomeworks( searchWord, (data, error) => {
      if(error){
        alert("Get all homeworks failed!");
        return;
      }

      this.setState({homeworks: data});
    });
  }

  routeCreateForm = () => {
    this.props.history.push("/create");
  }

  render () {
    return (
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <div className="input-group">
              <input id="search" type="text" className="form-control" placeholder="Search this site"/>
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button" onClick={this.searchHomeworks}>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="row justify-content-center m-2">
          <button  className="btn btn-primary" onClick={this.routeCreateForm}>
            Create new context
          </button>
        </div>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {
                this.state.homeworks.map(homework => {
                  return (
                    <div className="col-md-4" key={homework._id}>
                      <Card props = {this.props} homework = { homework } />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
}
 
export default Main;