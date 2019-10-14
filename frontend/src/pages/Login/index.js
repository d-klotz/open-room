import React, { useState } from 'react';
import api from '../../services/api';

const Login = ({ history }) => {
  
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  return (
    <>
      <p>
        Offer <strong>open rooms</strong> to software developers and find <strong>talents</strong> for your company
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail:</label>
        <input 
          type="email" 
          id="email" 
          placeholder="Your best e-mail"
          value={email}
          onChange={handleEmailChange}
        />
        <button className="btn" type="submit">Submit</button>
      </form>
    </>
  )
}

export default Login;