import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const url = "http://localhost:7777/api/users"

class App extends Component {
  constructor(props) {
  super(props);

  this.state = {
    users: [],

  }
}

componentDidMount() {
  axios.get(`${url}/`)
  .then(res => {
    this.setState({
      users: res.data
    })
  })
}
  render() {
    return (
      <div className="App">
        <div className="users">
        {this.state.users.map(user =>
        <div className="user"> 
        <h1>{user.name}</h1>
        </div>
        ) 
        })}
        
        </div>
      </div>
    );
  }
}

export default App;
