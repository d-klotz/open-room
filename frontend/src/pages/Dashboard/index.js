import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

const Dashboard = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });
      setRooms(response.data);
    }
    loadRooms();
  }, []);

  return (
   <>
    <ul className="room-list">
      {rooms.map(room => (
        <li key={room._id}>
          <header style={{backgroundImage: `url(${room.thumbnail_url})`}}/>
          <strong>{room.company}</strong>
          <span>{room.price ? `$${room.price}/day` : 'Free'}</span>
        </li>
      ))}
    </ul>

    <Link to="/new">
      <button className="btn">Create new room</button>
    </Link>
   </>
  )
}

export default Dashboard;