import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { NavBar } from './create-todo'
import axios from 'axios'

function Todos() {

    const [ todos, setTodos ] = useState({})

    const Todo = props => {
        const completed = props.todo.todo_completed
        return (
            <tr>
                <td style={ completed ? {textDecoration: "line-through"} : null} >{props.todo.todo_description}</td>
                <td style={ completed ? {textDecoration: "line-through"} : null} >{props.todo.todo_responsible}</td>
                <td style={ completed ? {textDecoration: "line-through"} : null} >{props.todo.todo_priority}</td>
                <td>
                    <Link to={`/edit/${props.todo._id}`}>Edit</Link>
                </td>
            </tr>
        )
    }

    const todoList = () => {
        let arr = []
        if (todos) {
            Object.keys(todos).forEach(key => { 
                arr.push(todos[key]) 
            })
            // eslint-disable-next-line
            return arr.map((todo, i) => {
                if (todo.todo_description) {
                    return <Todo todo={todo} key={i} />
                }
            })
        }
    }

    useEffect(() => {
        axios.get("http://localhost:4000/todos")
            .then(response => {
                setTodos(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    // eslint-disable-next-line
    }, [])

    return (
      <div>
        <NavBar />
        <table className="table table-striped" style={{ marginTop: 20}}>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Responsible</th>
                    <th>Priority</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {todoList()}
            </tbody>
        </table>
      </div>
    )
  }
  
  export default Todos;
  