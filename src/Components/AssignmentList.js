import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Assignment = (props) => {
  return (
    <tr>
      <td>{props.assignment.name}</td>
      <td>{props.assignment.description}</td>
      <td>{props.assignment.course}</td>
      <td className="pr-0">
        <div className="d-flex justify-content-between">
          {props.assignment.deadline}
          <div>
            <Link to={`/edit`}><button className="btn btn-sm btn-secondary mr-1">Edit</button></Link>
            <Link to={`/delete`}><button className="btn btn-sm btn-danger">Delete</button></Link>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default class AssignmentList extends Component {
  constructor(props) {
    super(props);

    this.renderAssignmentList = this.renderAssignmentList.bind(this);
    this.fetchAssignments = this.fetchAssignments.bind(this);

    this.state = {
      assignments: []
    }
  }

  componentDidMount() {
    this.fetchAssignments();
  }

  fetchAssignments () {
    axios.get('http://localhost:8000/')
      .then(res => {
        console.log(res);
        this.setState({assignments: res.data});
      })
      .catch(err => {
        console.log('Error: ' + err);
      })
  }

  renderAssignmentList() {
    return (
      this.state.assignments.length < 1 ?
        <h4>Congratulations, you don't currently have any assignments!</h4> :
        <div>
          <Link to="/add">
            <button type="button" className="btn btn-success mb-3">
              <span className="font-weight-bold">+</span> New Assignment
            </button>
          </Link>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Assignment</th>
                <th>Description</th>
                <th>Course</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {this.state.assignments.map((assignment) => 
                <Assignment assignment={assignment} />)}
            </tbody>
          </table>
        </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderAssignmentList()}
      </div>
    );
  }
}