import React from 'react'
import TodoList from './TodoList';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      input: '',
      hideCompleted: false,
      hiddenTodos: []
    }
  }
  handleChange = (e) => {
    this.setState({input: e.target.value});
  }
  pickArray = (bool) => {
    if (bool) {
      console.log('hidden todos', this.state.hiddenTodos)
      return this.state.hiddenTodos;
    } else {
      console.log('todos', this.state.todos)
      return this.state.todos;
    }
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
//method that filters through the todo state and sets hiddenTodos to the filtered array
filterCompleted = () => {
  const hiddenTodos = this.state.todos.filter(todo => !todo.completed);
  this.setState({hiddenTodos});
}
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
      this.filterCompleted();
  }
  render() {
    return (
      <>
        <h2>Todos: </h2>
        <div>
          <TodoList todos={this.pickArray(this.state.hideCompleted)} handleTodo={this.handleTodo}/>
        </div>
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input type='text' onChange={ this.handleChange} value={this.state.input}/>
            <button type='submit'>Submit</button>
          </form>
          <button onClick={(e) => this.toggleHideCompleted()}>Hide Completed</button>
        </div>
      </>
    )
  }
}
