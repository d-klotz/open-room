import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

const New = ( { history }) => {

  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{backgroundImage: `url(${preview})`}}
        className={thumbnail ? 'has-thumbnail': null}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
        <img src={camera} alt="Select img"/>
      </label>

      <label htmlFor="company">Company</label>
      <input 
        id="company"
        placeholder="Your awesome company"
        type="text"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="techs">Technology stack <span>(separated by comma)</span></label>
      <input 
        id="techs"
        placeholder="Used tech stack"
        type="text"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />
      <label htmlFor="price">Price per day <span>(let it blank if it's free)</span></label>
      <input 
        id="price"
        placeholder="Charged price per day use"
        type="text"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" className="btn">Create room</button>
    </form>
  )
}

export default New;