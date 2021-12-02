import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRouteChange, loadUser }) => {
    const [inputName, setName] = useState('');
    const [inputEmail, setEmail] = useState('');
    const [inputPassword, setPassword] = useState('');

    const onNameChange = (e) => {
        setName(e.target.value);
    }
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const onSubmitSignIn = () => {
        
        axios.post('http://localhost:7200/register',{
            name: inputName,
            email: inputEmail,
            password: inputPassword,
        }).then(response => {
            if(response.data) {
                loadUser(response.data);
                route();
            }
        }).catch(error => console.log({message: error.message}));
        console.log(inputName, inputEmail, inputPassword);
    }

    const route = () => {
        onRouteChange('home');
    }
    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                               type="text" 
                               name="name"  
                               id="name"
                               onChange={onNameChange}/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                               type="email" 
                               name="email-address"  
                               id="email-address"
                               onChange={onEmailChange}/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                               type="password" 
                               name="password"  
                               id="password"
                               onChange={onPasswordChange}/>
                    </div>
                    </fieldset>
                    <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Register"
                    onClick={onSubmitSignIn}
                    />
                    </div>
                </form>
            </main>
        </article>

    );
}


export default Register;