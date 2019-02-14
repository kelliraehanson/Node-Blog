import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const url = "https://nodeblog-kellihanson.herokuapp.com/api/users"

class App extends Component {
  constructor(props) {
  super(props);

  this.state = {
    users: [],
    newUser: {
      name: '',
    }

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

handleChange = e => {
  this.setState({
    newUser: {
      ...this.state.newUser.name, 
      [e.target.name] : e.target.value
    }
  })
}

handleSubmit = e => {
  e.preventDefault();
  axios.post(`${url}/`, this.state.newUser)
  .then(res => {
    axios.get(`${url}/`)
    .then(res => {
      this.setState({
        users: res.data
      })
    })
  })
}

  render() {
    return (
      <div className="App">

      <form onSubmit={this.handleSubmit}>
        <input
        name = "name"
        value = {this.state.newUser.name}
        onChange={this.handleChange}
        required
        placeholder="name"
        ></input>
        <button type='submit'>Add User</button>
      </form>
        <div className="users">
        {this.state.users.map(user =>
        <div className="user"> 
        <h1>{user.name}</h1>
        </div>
        ) 
        }
        
        </div>
      </div>
    );
  }
}

export default App;
