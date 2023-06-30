import React, { useEffect, useState } from 'react';
import '../Css/Login.css';

const Registration = () => {

    const [error, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        phone: "",
        age: "",
        email: "",
        gender: "",
        password: "",
        cpassword: "",
    });

    const SignupOnChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setError(validate(form));
        if (Object.keys(error).length === 0 && isSubmit) {
            const URL = 'http://localhost:5000/user';
            try {
                const response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ form }),
                })
                const data = await response.json()
                if (data.success) {
                    console.log(data);
                } else {
                    alert(data.error)
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const validate = (values) => {
        const error = {};
        if (!values.email) {
            error.email = 'Email is Required';
        }
        if (!values.fname) {
            error.fname = 'FirstName is Required';
        }
        if (values.fname.length < 3) {
            error.fname = 'Atleast 3 Character Required';
        }
        if (!values.phone) {
            error.phone = 'Phone No. is Required';
        } else if (values.phone.length < 10) {
            error.phone = 'Phone No. Min 10 Number';
        } else if (values.phone.length > 11) {
            error.phone = 'Phone No. Max 11 Number';
        }
        if (!values.age) {
            error.age = 'Age is Required';
        }
        if (!values.password) {
            error.password = 'Password is Required';
        } else if (values.password.length < 7) {
            error.password = 'Password atleast 8 Character';
        } else if (values.password.length > 12) {
            error.password = 'Password atmost 12 Character';
        }
        if (!values.cpassword) {
            error.cpassword = 'Confirm Password is Required';
        }
        if (values.password !== values.cpassword) {
            error.cpassword = 'Confirm Password Not Match';
        }
        if (!values.gender) {
            error.gender = 'Gender is Required';
        }
        return error;
    }

    useEffect(() => {

        // eslint-disable-next-line
    }, [error]);


    return (
        <div className='Registration'>

            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />
                <div className="signup">
                    <form action="/" method='POST' onSubmit={handleSignup}>
                        <label htmlFor="chk" aria-hidden="true" className='Signup_label'>Sign up</label>
                        <div className="emailContainer">
                            <input type="email" name="email" placeholder="Email" required="" value={form.email} onChange={SignupOnChange} />
                            <pre>{error.email ? error.email : " "}</pre>
                        </div>
                        <div className="nameContainer container">
                            <div className="fname">
                                <input type="text" name="fname" placeholder="First Name" required="" value={form.fname} onChange={SignupOnChange} />
                                <pre>{error.fname ? error.fname : " "}</pre>
                            </div>
                            <div className="lname">
                                <input type="text" name="lname" placeholder="Last Name" required="" value={form.lname} onChange={SignupOnChange} />
                            </div>
                        </div>
                        <div className="numberContainer container">
                            <div className="phone">
                                <input type="number" name="phone" placeholder="Phone No." required="" value={form.phone} onChange={SignupOnChange} />
                                <pre>{error.phone ? error.phone : " "}</pre>
                            </div>

                            <div className="age">
                                <input type="number" name="age" placeholder="Age" required="" value={form.age} onChange={SignupOnChange} />
                                <pre>{error.age ? error.age : " "}</pre>
                            </div>
                        </div>
                        <div className="passwordContainer container">
                            <div className="fpassword">
                                <input type="password" name="password" placeholder="Password" required="" value={form.password} onChange={SignupOnChange} />
                                <pre>{error.password ? error.password : " "}</pre>
                            </div>
                            <div className="cpassword">
                                <input type="password" name="cpassword" placeholder="Confirm Password" required="" value={form.cpassword} onChange={SignupOnChange} />
                                <pre>{error.cpassword ? error.cpassword : " "}</pre>
                            </div>
                        </div>
                        <div className="gender">
                            <div className="gender_Male">
                                <label htmlFor="gender" className='Gender_label'>Male</label>
                                <input type="radio" name="gender" id="gender" className='Gender_input' value='Male' onChange={SignupOnChange} />
                            </div>
                            <div className="gender_Female">
                                <label htmlFor="gender" className='Gender_label'>Female</label>
                                <input type="radio" name="gender" id="gender" className='Gender_input' value='Female' onChange={SignupOnChange} />
                            </div>
                        </div>
                        <pre style={{ textAlign: 'center' }}>{error.gender ? error.gender : " "}</pre>
                        <button>Sign up</button>
                    </form>
                </div>

                <div className="login">
                    <form>
                        <label htmlFor="chk" aria-hidden="true" className='Login_label'>Login</label>
                        <input type="email" name="email" placeholder="Email" required="" />
                        <input type="password" name="pswd" placeholder="Password" required="" />
                        <button>Login</button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Registration;
