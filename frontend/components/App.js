import React from 'react'
import TodoList from './TodoList';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [{
        id: 1,
        name: '',
        completed: false
      }],
      input: '',
      hideCompleted: false
    }
  }
  handleChange = (e) => {
    this.setState({input: e.target.value});
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const todo = {title: this.state.input, done: false};
    this.setState({input: ''});
    this.setState({todos: [...this.state.todos, todo]});
  }
  handleTodo = (id) => {
    // toggles completed state of the todo with the id passed in
    // patches the result to the server using the id as the endpoint
    // then updates the state of the todo with the new data
    const prevState = this.state.todos;
    const todo = this.state.todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    axios.patch(`${URL}/${id}`, todo)
      .then(res => {
        console.log(todo.completed);
        this.setState(prevState => ({
          todos: prevState.todos.map(todo => {
            if (todo.id === id) {
              return {
                ...todo,
                completed: todo.completed
              };
            } else {
              return todo;
            }
          })
        }));
      })
      .catch(err => {
        console.error(err);
      }
    )
  }
  componentDidMount() {
    console.log('component Did Mount');
    axios.get(URL)
      .then(res => {
        this.setState({todos: res.data.data});
        console.log(res.data.data);
      })
      .catch(err => {
        console.error(err);
      })
  }
  // function that checks if the component has updated and what updated:
  componentDidUpdate(prevProps, prevState) {
    console.log('component Did Update');
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
  }
  render() {
    return (
      <>
        <h2>Todos: </h2>
        <div>
          <TodoList todos={this.state.todos} handleTodo={this.handleTodo}/>
        </div>
        <div>
          <input type='text' onChange={ this.handleChange} value={this.state.input}/>
        </div>
      </>
    )
  }
}
