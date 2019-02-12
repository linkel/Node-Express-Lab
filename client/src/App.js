import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import {Route} from "react-router-dom"
import PostList from "./components/PostList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    console.log("is this hitting?")
    axios.get("http://localhost:8000/api/posts")
    .then(response => {
      console.log(response.data)
      this.setState({posts: response.data.posts})})
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="App">
        <h1>My Post List</h1>
        <Route exact path="/" render={(props) => <PostList posts={this.state.posts} {...props}/>}/>
      </div>
    );
  }
}

export default App;
