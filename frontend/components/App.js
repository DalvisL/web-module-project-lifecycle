import React from 'react'
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      input: '',
      hideCompleted: false,
    }
  }
  handleChange = (e) => {
    this.setState({input: e.target.value});
  }
  listToRender = () => {
    if (this.state.hideCompleted) {
      return this.state.todos.filter(todo => !todo.completed);
    }
    return this.state.todos;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    //post the todo to the URL and update the state with the new todo
    axios.post(URL, {name: this.state.input})
      .then(res => {
        this.setState({todos: [...this.state.todos, res.data.data]});
        // clear input
        this.setState({input: ''});
        console.log(res);
      })
      .catch(err => console.error(err));
  }
  handleTodo = (id) => {
    //patch the todo with the id to the URL and update the state with the new todo
    axios.patch(`${URL}/${id}`)
      .then(res => {
        const todoList = this.state.todos.map(todo => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
        this.setState({todos: todoList});
        console.log(res);
      })
      .catch(err => console.error(err));
  }
 
// Method that filters out the incomplete todos onto 
toggleHideCompleted = () => {
  this.setState({hideCompleted: !this.state.hideCompleted});
}
  componentDidMount() {
    console.log('component did mount')
    axios.get(URL)
      .then(res => {
        this.setState({todos: res.data.data});
        console.log(res.data.data);
      })
      .catch(err => {
        console.error(err);
      })
  }
  render() {
    return (
      <>
        <h2>Todos: </h2>
        <div>
          <TodoList todos={this.listToRender()} handleTodo={this.handleTodo}/>
        </div>
        <div>
          <Form handleChange={this.handleChange} handleSubmit={this.handleSubmit} input={this.state.input}/>
          <button onClick={(e) => this.toggleHideCompleted()}>{this.state.hideCompleted ? 'Show Completed' : 'Hide Completed' }</button>
        </div>
      </>
    )
  }
}
