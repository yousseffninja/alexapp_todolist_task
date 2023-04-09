import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Button, Card, Form } from 'react-bootstrap';

const URL = "/api/v1/todos";
const ME = "/api/v1/users/me";

function Todo({ todo, index, markTodo, removeTodo }) {
    return (
        <div
            className="todo"

        >
            <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
            <div>
                <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
                <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
            </div>
        </div>
    );
}

function FormTodo({ addTodo }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label><b>Add Todo</b></Form.Label>
                <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
            </Form.Group>
            <Button variant="primary mb-3" type="submit">
                Submit
            </Button>
        </Form>
    );
}

const Home = () => {
    const [todos, setTodos] = useState([]);

    const getData = () => {
        axios.get(ME, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user')}`
            }
        }).then(res => {
            const todosArr = res.data.arr
            console.log(todosArr)
            setTodos(todosArr);
        });
        console.log(todos)
    }

    const addTodo = (text) => {
        axios.post(URL, JSON.stringify({
            text: text
        }), {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user')}`
            }
        }).then(e => window.location.replace('/home'));
    }

    const markTodo = (id, index) => {
        axios.patch(`${URL}/${id}`, JSON.stringify({
            isDone: !todos[index].isDone
        }), {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user')}`
            }
        }).then(e => window.location.replace('/home'));
    }

    const removeTodo = (id) => {
        axios.delete(`${URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user')}`
            }
        }).then(e => window.location.replace('/home'));
    }

    return (
        <div className="app">
            <div className="container">
                <h1 className="text-center mb-4">Todo List</h1>
                <Button variant="primary mb-3" onClick={getData}>
                    Get Todos
                </Button>
                <FormTodo addTodo={addTodo} />
                <div>
                    {todos.map((todo, index) => (
                        <Card>
                            <Card.Body>
                                <Todo
                                    key={todo.id}
                                    index={index}
                                    todo={todo}
                                    markTodo={() => markTodo(todo._id, index)}
                                    removeTodo={() => removeTodo(todo._id)}
                                />
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;