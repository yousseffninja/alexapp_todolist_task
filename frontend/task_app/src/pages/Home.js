import {useContext, useEffect, useState} from "react";
import axios from "../api/axios";
import { Button, Card, Form } from 'react-bootstrap';
import TodosContext from "../context/TodosProvider";
// import data from "bootstrap/js/src/dom/data";
import useTodos from "../hooks/useTodos";

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
    const data = useContext(TodosContext);

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
    const { todosData } = useContext(TodosContext);
    console.log("lol", todosData)
    const getData = async () => {
        const response = await axios.get(ME, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user')}`
            }
        }).then((res) => {
            console.log(res);
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
        }).then(e => {
            console.log((e))
            setTodos([...todos, e.data.todo]);
        });
    }

    const markTodo = (id, index) => {
        axios.patch(`${URL}/${id}`, JSON.stringify({
            isDone: !todos[index].isDone
        }), {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user')}`
            }
        }).then(e => {
            let elements = [...todos];
            let currentElementIndex = elements.findIndex((x) => x.id === id);
            elements[currentElementIndex].isDone = !elements[currentElementIndex].isDone
            setTodos(elements);
        });
    }

    // useEffect(() => {
    //     console.log(todosData);
    //     setTodos(todosData);
    // }, [todos])

    const removeTodo = (id) => {
        axios.delete(`${URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user')}`
            }
        }).then(e => {
            const temp = [...todos];
            temp.splice(id, 1);
            setTodos(temp);
        });
    }

    const useTodoContext = () => {
        const arr = [];
        // data.map(e => arr.push(e));
        console.log(todosData);
        setTodos(todosData);
    }

    // useEffect(() => useTodoContext, [todos])

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