import React from 'react';
import CreateTodo from './create-todo'
import Todos from './Todos'
import EditTodo from './EditTodo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' component={CreateTodo} exact></Route>
        <Route path='/todos' component={Todos} exact></Route>
        <Route path='/edit/:id' component={EditTodo} exact></Route>
      </Switch>
    </Router>
    </>
  )
}

export default App;
