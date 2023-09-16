import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { API_URL, API_KEY } from '../api';
import Search from './Search';

const States = () => {
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStates = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(
        `${API_URL}/states?country=Canada&key=${API_KEY}`,
      );

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setStates(data.data);
      setFilteredStates(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handleSearch = (query) => {
    const filtered = states.filter(
      (state) => state.state.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredStates(filtered);
  };

  const renderStates = () => {
    if (loading) {
      return <p className="loading">Loading...</p>;
    }

    if (error) {
      return (
        <div className="error">
          <p>Error fetching data. Please try again.</p>
          <button type="button" onClick={fetchStates}>
            Retry
          </button>
        </div>
      );
    }

    return (
      <ul>
        {filteredStates.map((state) => (
          <li key={state.state}>
            <Link to={`/${state.state}`}>
              <span>{state.state}</span>
              <FaArrowRight />
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <nav>
        <h2>Canadian States</h2>
        <Search onSearch={handleSearch} />
      </nav>
      {renderStates()}
    </div>
  );
};

export default States;
