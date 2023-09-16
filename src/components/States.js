import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, API_KEY } from '../api';

const States = () => {
  const [states, setStates] = useState([]);

  const fetchStates = async () => {
    const res = await fetch(
      `${API_URL}/states?country=Canada&key=${API_KEY}`,
    );
    const data = await res.json();
    setStates(data.data);
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <ul>
      {states.map(({ state }) => (
        <li key={state}>
          <Link to={`/${state}`}>
            {state}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default States;
