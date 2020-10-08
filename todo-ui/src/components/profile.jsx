import React, { Component } from "react";
import Editor from "./editor/editor";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{}],
      pendingTodos: 0,
      inProgress: 0,
    };
  }

  //syncState to update state
  syncState = (todos) => {
    let cnt = 0;
    todos.map((todo, index) => {
      if (todo.inProgress) cnt++;
    });
    this.setState({
      todos: todos,
      pendingTodos: todos.length - cnt,
      inProgress: cnt,
    });
  };

  //componentDidMount to set states before render
  componentDidMount() {
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    };

    fetch("http://localhost:8085/todo/getTodos", requestOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        this.syncState(data.todos);
      });
  }

  //handleMarkComplete to handle mark complete todo
  handleMarkComplete = (index) => {
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify(this.state.todos[index]),
    };

    fetch("http://localhost:8085/todo/deleteTodo ", requestOptions).then(
      (res) => {
        if (res.status === 200) {
          this.syncState(this.state.todos.filter((todo, ind) => ind != index));
          return res.json();
        }
      }
    );
  };

  //handleMarkInProgress to handle mark In progress todo
  handleMarkInProgress = (index) => {
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify(this.state.todos[index]),
    };

    fetch("http://localhost:8085/todo/editTodo ", requestOptions).then(
      (res) => {
        if (res.status === 200) {
          let todos = this.state.todos;
          todos[index].inProgress = true;
          this.syncState(todos);
          return res.json();
        }
      }
    );
  };

  //render
  render() {
    return (
      <div>
        inProgress : {this.state.inProgress}
        <br />
        pendingTodos : {this.state.pendingTodos}
        {this.state.todos.map((todo, index) => {
          return (
            <Editor
              key={index}
              title={this.state.todos[index].title}
              todo={this.state.todos[index].todo}
              handleMarkComplete={() => this.handleMarkComplete(index)}
              handleMarkInProgress={() => this.handleMarkInProgress(index)}
            />
          );
        })}
      </div>
    );
  }
}

export default Profile;
