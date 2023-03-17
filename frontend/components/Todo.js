import React from 'react'

export default class Todo extends React.Component {
  constructor() {
    super()
  }
  
  render() {
    return (
      <div>
        <span onClick={(e) => this.props.handleTodo(this.props.todo.id)} className='todo'>{`${this.props.todo.name} ${this.props.todo.completed ? '✔' : ''}`}</span>
      </div>
    )
  }
}
