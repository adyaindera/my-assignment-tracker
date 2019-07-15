import React, { Component } from 'react';
import axios from 'axios';

export default class AddEditAssignment extends Component {
  constructor(props) {
    super(props);

    this.postAssignment = this.postAssignment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);

    this.buttonValue = this.props.isEdit ? 'Edit Assignment' : 'Add Assignment';
    this.titleValue = this.props.isEdit ? 'Edit assignment:' : 'Let\'s create a new assignment!';

    this.state = {
      name: '',
      description: '',
      course: '',
      deadline: new Date()
    };
  }

  componentDidMount() {
    if (this.props.isEdit) {
      axios.get(`http://localhost:8000/${this.props.assignmentId}`)
      .then(res => {
        this.setState( {
          name: res.data.name,
          description: res.data.description,
          course: res.data.course,
          deadline: res.data.deadline.substring(0, 10)
        })
      })
      .catch(err => {
        console.log('Error: ' + err);
      });
    }
  }

  postAssignment(assignment, isEdit, assignmentId) {
    let uri;
    if (isEdit) {
      uri = 'http://localhost:8000/edit/' + assignmentId;
    } else {
      uri = 'http://localhost:8000/add';
    }
    axios.post(uri, assignment)
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
    this.postAssignment(assignment, this.props.isEdit, this.props.assignmentId);
  }

  render() {
    return (
      <div>
        <h4 className="row ml-1 mb-5">{this.titleValue}</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row ml-1">
            <div className="form-group mr-sm-1">
              <input type="text" value={this.state.name} placeholder="Assignment's Name" onChange={this.onChangeName} className="form-control" required />
            </div>
            <div className="form-group mx-sm-1">
              <input type="text" value={this.state.description} placeholder="Description" onChange={this.onChangeDesc} className="form-control" />
            </div>
            <div className="form-group mx-sm-1">
              <input type="text" value={this.state.course} placeholder="Course" onChange={this.onChangeCourse} className="form-control" />
            </div>
            <div className="form-group mx-sm-1">
              <input type="date" value={this.state.deadline} placeholder="Assignment's Deadline" onChange={this.onChangeDeadline} className="form-control" />
            </div>
          </div>
          <div className="form-row d-flex ml-1 mt-2">
            <input type="submit" value={this.buttonValue} className="d-block btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}