import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import AssignmentList from './Components/AssignmentList';
import AddAssignment from './Components/AddAssignment';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

function App() {
  const assignmentsExample = [
    {
      name: 'Concurrent Cached Fileserver',
      description: 'Concurrent project description',
      course: 'CS 61C',
      deadline: '10/11/2019'
    },
    {
      name: 'B+ Tree Indexing',
      description: 'B+ Tree database project description',
      course: 'CS 186',
      deadline: '10/13/2019'
    }
  ];

  return (
    <Router>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1>Adya's Assignments Fall 2019</h1>
        </div>
      </div>

      <div className="container">
        <Link to="/add">
          <button type="button" className="btn btn-success mb-3">
            <span className="font-weight-bold">+</span> New Assignment
          </button>
        </Link>
        <Route 
          exact path="/" 
          render={ () => <AssignmentList assignments={assignmentsExample} /> } 
        />
        <Route path="/add" component={AddAssignment} />
      </div>
    </Router>
  );
}

export default App;
