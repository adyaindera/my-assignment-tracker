import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

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
    this.assignmentList = this.assignmentList.bind(this);
    this.state = {
      assignments: this.props.assignments
    }
  }

  assignmentList() {
    return this.state.assignments.length < 1 ?
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
            <Assignment assignment={assignment} />)}
        </tbody>
      </table>
  }

  render() {
    return (
      <div>
        {this.assignmentList()}
      </div>
    );
  }
}

AssignmentList.propTypes = {
  assignments: PropTypes.array.isRequired
}

AssignmentList.defaultProps = {
  assignments: []
}