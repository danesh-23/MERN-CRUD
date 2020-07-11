import React, { useState, useEffect } from 'react'
import { NavBar } from './create-todo'
import { Form, Button, Jumbotron } from 'react-bootstrap'
import axios from 'axios'

export default (props) => {

    const [description, setDescription] = useState('')
    const [responsible, setResponsible] = useState('')
    const [priority, setPriority] = useState('')
    const [completed, setCompleted] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:4000/todos/${props.match.params.id}`)
            .then(response => {
                setDescription(response.data.todo_description)
                setResponsible(response.data.todo_responsible)
                setPriority(response.data.todo_priority)
                setCompleted(response.data.todo_completed)
            })
            .catch(err => console.log(err))
    }, [])
    
    const handleSubmit = (event) => {
        event.preventDefault()
        if (description === "" || responsible === "" || priority === null) {
            console.log("empty field")
            return
        }
        const todo = {
            todo_description: description,
            todo_responsible: responsible,
            todo_priority: priority,
            todo_completed: completed
        }
        axios.post(`http://localhost:4000/todos/update/${props.match.params.id}`, todo)
            .then(res => console.log(res.data))
    }

    return (
        <>
        <NavBar />
        <Jumbotron style={{backgroundColor: "white", marginLeft: "-10px", marginTop: "-30px"}}>
            <h2>Update ToDo Item:</h2><br />
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="todo" placeholder="Enter todo description" onChange={(event) => setDescription(event.target.value)} value={description} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Responsible:</Form.Label>
                    <Form.Control type="responsible" placeholder="Who is responsible for this todo?" onChange={(event) => setResponsible(event.target.value)} value={responsible} />
                </Form.Group>
                Priority:
                <Form.Group>
                    <Form.Check type="checkbox" name="Low" label="Low" onChange={(event) => setPriority(event.target.checked ? event.target.name : null)} checked={priority === "Low" ? true : false} />
                    <Form.Check type="checkbox" name="Medium" label="Medium" onChange={(event) => setPriority(event.target.checked ? event.target.name : null)} checked={priority === "Medium" ? true : false} />
                    <Form.Check type="checkbox" name="High" label="High" onChange={(event) => setPriority(event.target.checked ? event.target.name : null)} checked={priority === "High" ? true : false} />
                </Form.Group>
                <Form.Check type="checkbox" name="Completed" label="Completed" onChange={(event) => setCompleted(event.target.checked ? true : false)} checked={completed ? true : false} />
                <br />
                <Button variant="primary" type="submit" >
                    Update Todo
                </Button>
            </Form>
        </Jumbotron>
        </>
    )
}
