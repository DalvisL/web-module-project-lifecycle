import React from 'react'

export default class Form extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(e)}>
        <input type='text' onChange={ this.props.handleChange} value={this.props.input}/>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
