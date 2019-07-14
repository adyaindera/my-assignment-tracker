import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import AssignmentList from './Components/AssignmentList';
import AddAssignment from './Components/AddAssignment';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <Link to="/">
            <h1>Adya's Assignments Fall 2019</h1>
          </Link>
        </div>   
      </div>

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
