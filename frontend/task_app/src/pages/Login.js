import Layout from "../components/Layout";
import axios from "../api/axios"
import {useEffect, useRef, useState, useContext} from "react";
import {TextField} from "@mui/material";
import { Link } from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import TodosProvider from '../context/TodosProvider'
import useTodos from "../hooks/useTodos";
import TodosContext from "../context/TodosProvider";
const LOGIN_URL = '/api/v1/users/login'

const Login = () => {
    // const { setAuth } = useContext(AuthContext)
    const { todosData ,setTodos } = useContext(TodosContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const  [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger
        const response = await axios.post(LOGIN_URL,
            JSON.stringify({
                email,
                password
            }),
            {
                headers: {'Content-Type': 'application/json'},
            }
        ).then((res) => {
            const token = res?.data?.token
            // setAuth({ email, password, token });
            localStorage.setItem("user", res.data.token);

        }).catch((e) => {
            console.log(e)
        })
        const res = await axios.get("/api/v1/users/me", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user')}`
            }
        }).then((res) => {
            const todo = res.data.arr
            console.log(todo)
            setTodos(todo)
            // console.log(setTodos)
            setTodos(res?.data?.arr);
            // console.log(res?.data?.arr)
            todosData&& console.log("lol", todosData)
            // window.location.replace('/home');
        })
        //
    }

    return (
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Login</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <TextField
                                        id="Email"
                                        // label="Required"
                                        placeholder="Email"
                                        type='email'
                                        value={email}
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-3">
                                    <TextField
                                        id="Password"
                                        // label="Disabled"
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block">
                                        Login
                                    </button>
                                    <p className="text-center">Don't have account? <Link to="/register">Register here</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login;