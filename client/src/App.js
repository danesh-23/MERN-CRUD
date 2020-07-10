import React from 'react';
import CreateTodo from './create-todo'
import Todos from './Todos'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' component={CreateTodo} exact></Route>
        <Route path='/todos' component={Todos} exact></Route>
      </Switch>
    </Router>
    </>
  )
}

export default App;
