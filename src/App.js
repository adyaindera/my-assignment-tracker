import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import AssignmentList from './Components/AssignmentList';
import AddEditAssignment from './Components/AddEditAssignment';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.checkServerConnection = this.checkServerConnection.bind(this);

    this.state = {
      isConnected: true,
      isLoading: true
    }
  }

  componentDidMount() {
    this.checkServerConnection();
  }

  checkServerConnection() {
    axios.get('http://localhost:8000')
      .then(res => this.setState({isConnected: true}))
      .catch(err => this.setState({isConnected: false}))
      .finally(() => this.setState({isLoading: false}));
  }

  render() {
    return (
      <Router>      
        <nav className="navbar navbar-dark bg-dark sticky-top pt-3 pb-3 mb-5">
          <a className="navbar-brand" href="http://localhost:3000">
            Adya's Assignments Fall 2019
          </a>
        </nav>
        {this.state.isLoading ? 
          <div></div> :
          <div className="container">
            {!this.state.isConnected ?
              <div className="p-3 mb-2 bg-danger text-center rounded text-white">
                <h3>Server not started or DB is not connected!</h3>
              </div> :
              <div>
                <Route 
                  exact path="/" 
                  render={ () => <AssignmentList /> } 
                />
                <Route path="/add" component={AddEditAssignment} />
                <Route 
                  path="/edit/:id"
                  render={ (props) => <AddEditAssignment isEdit={true} assignmentId={props.match.params.id}/> }
                />
              </div>
            }
          </div>
        }
      </Router>
    );
  }
}
