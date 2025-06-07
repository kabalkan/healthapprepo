// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    console.log("Sign_Up component loaded");
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router
    const [errors, setErrors] = useState({});


    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!email.trim()) newErrors.email = "Email cannot be empty.";
        if (!phone.trim()) newErrors.phone = "Phone number cannot be empty or longer than 10 digits.";
        if (!name.trim()) newErrors.name = "Name cannot be empty.";
        if (password.length < 10) newErrors.password = "Password cannot be empty.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // If no errors, clear previous ones
        setErrors({});

        console.log("Register function called");

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        }) ;
        

        console.log("Raw response:", response);
        const json = await response.json();
        console.log("Response JSON:", json);

        if (json.authtoken) {
        // Store user data in session storage
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        const username = email.split('@')[0];
        sessionStorage.setItem("username", username);

        // Redirect user to home page
        navigate("/");
        window.location.reload(); // Refresh the page
    }
    };

    const resetForm = () => {
        // Clear form fields
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setShowerr('');
        
        // Remove relevant sessionStorage keys
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("auth-token");
        };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{marginTop:'5%'}}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="form-control" 
                                    placeholder="Enter your email" 
                                    aria-describedby="helpId" 
                            />
                            {errors.email && <div className="err" style={{ color: 'red' }}>{errors.email}</div>}
                        </div>

                        <div className="form-group">
                        <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                // type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="e.g. Jane Doe"
                                // required
                            />
                            {errors.name && <div className="err" style={{ color: 'red' }}>{errors.name}</div>}

                        </div>
                            <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                name="phone"
                                id="phone"
                                className="form-control"
                                placeholder="e.g. +44 123 456 789"
                                // required                                
                            />
                            {errors.phone && <div className="err" style={{ color: 'red' }}>{errors.phone}</div>}

                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                // required
                            />
                            {errors.password && <div className="err" style={{ color: 'red' }}>{errors.password}</div>}
                        </div>

                        <div className="form-buttons">
                            <button type="submit" className="btn1">Submit</button>
                            <button type="button" className="btn2" onClick={resetForm}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        /* Note: Sign up role is not stored in the database. Additional logic can be implemented for this based on your React code. */
    );
}

export default Sign_Up; // Export the Sign_Up component for use in other components