import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        {this.props.todos.map((todo, index) => {
          return <Todo key={index} todo={todo} handleTodo={this.props.handleTodo} />
        })}
      </div>
    )
  }
}
