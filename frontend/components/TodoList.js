import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        {/* Maps through the state to render the different todos */}
        {this.props.todos.map((todo, index) => {
          return <Todo className='todo' key={index} todo={todo} handleTodo={this.props.handleTodo} />
        })}
      </div>
    )
  }
}
