import React, {useState } from 'react';
import { Nav, Navbar, Form, FormControl, Button, Jumbotron } from 'react-bootstrap'
import axios from 'axios'

function CreateTodo() {

    const [description, setDescription] = useState('')
    const [responsible, setResponsible] = useState('')
    const [priority, setPriority] = useState('')

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
            todo_completed: false
        }
        axios.post('http://localhost:4000/todos/add', todo)
            .then(res => console.log(res.data))
    }

    return (
        <>
            <NavBar />
            <Jumbotron style={{backgroundColor: "white", marginLeft: "-10px"}}>
                <h2>Create New ToDo:</h2><br />
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
                    <Button variant="primary" type="submit" >
                        Create Todo
                    </Button>
                </Form>
            </Jumbotron>
        </>
    );
}

export const NavBar = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">MERN Stack To-Do</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href='/todos'>Todo</Nav.Link>
        <Nav.Link href="/">Create Todo</Nav.Link>
        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
        </Form>
        </Navbar.Collapse>
    </Navbar>
)

export default CreateTodo;