import React, { Component } from 'react';
import axios from 'axios';

export default class AddAssignment extends Component {
  constructor(props) {
    super(props);

    this.postAssignment = this.postAssignment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);

    this.state = {
      name: '',
      description: '',
      course: '',
      deadline: new Date()
    };
  }

  postAssignment(assignment) {
    axios.post('http://localhost:8000/add', assignment)
      .then(res => console.log(res.data));
    window.location = '/';
  }

  onChangeName(e) {
    this.setState({name: e.target.value});
  }

  onChangeDesc(e) {
    this.setState({description: e.target.value});
  }

  onChangeCourse(e) {
    this.setState({course: e.target.value});
  }

  onChangeDeadline(e) {
    this.setState({deadline: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const assignment = {
      name: this.state.name,
      description: this.state.description,
      course: this.state.course,
      deadline: this.state.deadline
    }
    this.postAssignment(assignment);
  }

  render() {
    return (
      <div>
        <h4 className="row ml-1 mb-5">Let's create a new assignment!</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row ml-1">
            <div className="form-group mr-sm-1">
              <input type="text" placeholder="Assignment's Name" onChange={this.onChangeName} className="form-control" required />
            </div>
            <div className="form-group mx-sm-1">
              <input type="text" placeholder="Description" onChange={this.onChangeDesc} className="form-control" />
            </div>
            <div className="form-group mx-sm-1">
              <input type="text" placeholder="Course" onChange={this.onChangeCourse} className="form-control" />
            </div>
            <div className="form-group mx-sm-1">
              <input type="date" placeholder="Assignment's Deadline" onChange={this.onChangeDeadline} className="form-control" />
            </div>
          </div>
          <div className="form-row d-flex ml-1 mt-2">
            <input type="submit" value="Add Assignment" className="d-block btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}