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
          {props.assignment.deadline.substring(0, 10)}
          <div>
            <Link to={`/edit/${props.assignment._id}`}><button className="btn btn-sm btn-secondary mr-1">Edit</button></Link>
            <button className="btn btn-sm btn-danger" onClick={() => props.handleDelete(props.assignment._id)}>Delete</button>
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
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      assignments: []
    }
  }

  handleDelete(id) {
    axios.delete('http://localhost:8000/'+id)
      .then(res => console.log(res.data));
    window.location = '/';
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
      });
  }

  renderAssignmentList() {
    return (
      <div>
        <Link to="/add">
        <button type="button" className="btn btn-success mb-3">
          <span className="font-weight-bold">+</span> New Assignment
        </button>
        </Link>
        {this.state.assignments.length < 1 ?
        <h4>Congratulations, you don't currently have any assignments!</h4> :
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
                <Assignment 
                  key={assignment._id} 
                  assignment={assignment}
                  handleDelete={this.handleDelete}
                />)}
            </tbody>
          </table>}
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