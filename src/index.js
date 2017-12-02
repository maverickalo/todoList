import React from 'react';
import ReactDOM from 'react-dom';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleDeleteTodos = this.handleDeleteTodos.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
  }
  handleCompleted(id) {
    const toggle = this.state.todos.map(todo => {
      if (id === todo.id) {
        todo.isCompleted = !todo.isCompleted;
        return todo;
      }
    });
    this.setState({
      todos: [].concat(toggle),
    });
  }
  handleDeleteTodos() {
    this.setState(() => ({
      todos: [],
    }));
  }
  handleAddTodo(todo) {
    if (!todo.text) {
      return 'Please Enter a Value';
    } else if (
      this.state.todos
        .map(a => {
          return a.text;
        })
        .indexOf(todo.text) > -1
    ) {
      return 'Looks like this one already Exists';
    }
    this.setState(prevState => ({
      todos: prevState.todos.concat([
        {
          id: todo.id,
          text: todo.text,
          isCompleted: todo.isCompleted,
        },
      ]),
    }));
  }
  render() {
    return (
      <div>
        <Header />
        <AddTodo handleAddTodo={this.handleAddTodo} />
        <TodoList
          handleCompleted={this.handleCompleted}
          handleDeleteTodos={this.handleDeleteTodos}
          todos={this.state.todos}
        />
      </div>
    );
  }
}
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: undefined };
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleAdd(e) {
    e.preventDefault();
    const value = e.target.elements.todoInput.value.trim();
    const todo = { text: value, id: Date.now(), isCompleted: false };
    const error = this.props.handleAddTodo(todo);
    this.setState(() => ({ error }));
  }

  render() {
    return (
      <div className="addTodo">
        {this.state.error && <p className="error">{this.state.error}</p>}
        <form onSubmit={this.handleAdd}>
          <input type="text" name="todoInput" />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button className="removeAll" onClick={this.props.handleDeleteTodos}>
          Delete All Todos
        </button>
        <ul className="todoList">
          {this.props.todos.map(todo => {
            return (
              <TodoListItem
                key={todo.id}
                text={todo.text}
                id={todo.id}
                isCompleted={todo.isCompleted}
                handleCompleted={this.props.handleCompleted}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChecked = this.handleChecked.bind(this);
  }
  handleChecked(e) {
    this.props.handleCompleted(this.props.id);
  }
  render() {
    const liClass =
      'checkBox checkboxtext ' +
      (this.props.isCompleted ? 'finished' : 'not-finished');
    const liCompletedText = this.props.isCompleted ? '(Completed)' : '';
    return (
      <li className="list-item">
        <span>
          <input type="checkBox" onChange={this.handleChecked} />
        </span>
        <span className={liClass}>{this.props.text}</span>
        <span className="completedText">{liCompletedText}</span>
      </li>
    );
  }
}

const Header = () => {
  return (
    <div className="header">
      <h1>Welcome to My Todo List</h1>
      <h3>Please Enter a Todo Below</h3>
    </div>
  );
};

ReactDOM.render(<Todo />, document.querySelector('.container'));
