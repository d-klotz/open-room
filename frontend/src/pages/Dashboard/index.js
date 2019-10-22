import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import api from '../../services/api';

import './styles.css';

const Dashboard = () => {

  const [rooms, setRooms] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id }
  }), [user_id]);

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

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
    <ul className="notifications">
      {requests.map(request => (
        <li key={request._id}>
          <p>
            <strong>{request.user.email}</strong> is 
            requesting a spot at <strong>{request.spot.company}</strong> 
            on <strong>{request.date}</strong>. 
          </p>
          <button className="accept">Accept</button>
          <button className="decline">Decline</button>
        </li>
      ))}
    </ul>

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