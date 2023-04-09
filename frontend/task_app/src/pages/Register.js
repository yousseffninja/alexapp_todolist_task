import {TextField} from "@mui/material";
import { Link } from 'react-router-dom'
import Layout from "../components/Layout";
import axios from "../api/axios";
import {useState} from "react";

const REGISTER_URL = '/api/v1/users/signup';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(
            REGISTER_URL,
            JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                passwordConfirm
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
                withCredentials: true,
            }
        ).then(() => window.location.replace('/'))
            .catch((e) => console.log(e));
    }

    return (
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Register</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <TextField
                                        id="First Name"
                                        // label="Required"
                                        placeholder="First Name"
                                        type='text'
                                        value={firstName}
                                        onChange={(e)=>{setFirstName(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-3">
                                    <TextField
                                        id="Last Name"
                                        // label="Required"
                                        placeholder="Last Name"
                                        type='text'
                                        value={lastName}
                                        onChange={(e)=>{setLastName(e.target.value)}}
                                    />
                                </div>
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
                                        // label="Required"
                                        placeholder="Password"
                                        type='password'
                                        value={password}
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </div>
                                <div className="mb-3">
                                    <TextField
                                        id="Confirm Password"
                                        // label="Required"
                                        placeholder="Confirm Password"
                                        type='password'
                                        value={passwordConfirm}
                                        onChange={(e)=>{setPasswordConfirm(e.target.value)}}
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block">Register Now
                                    </button>
                                    <p
                                        className="text-center">Have already an account <Link to="/">Login here</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register;