import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import AssignmentList from './Components/AssignmentList';
import AddAssignment from './Components/AddAssignment';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

function App() {
  return (
    <Router>      
      <nav className="navbar navbar-dark bg-dark sticky-top pt-3 pb-3 mb-5">
        <a className="navbar-brand" href="http://localhost:3000">
          Adya's Assignments Fall 2019
        </a>
      </nav>
      <div className="container">
        <Route 
          exact path="/" 
          render={ () => <AssignmentList /> } 
        />
        <Route path="/add" component={AddAssignment} />
      </div>
    </Router>
  );
}

export default App;
