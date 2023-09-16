import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa6';
import { API_URL, API_KEY } from '../api';
import { setCity } from '../redux/city/citySlice';

const City = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);
  const { state: selectedState, city: selectedCity } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/city?city=${selectedCity}&state=${selectedState}&country=Canada&key=${API_KEY}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      dispatch(setCity(data.data));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [dispatch, selectedState, selectedCity]);

  useEffect(() => {
    fetchData();
  }, [fetchData, selectedState, selectedCity]);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    fetchData();
  };

  const renderContent = () => {
    if (loading) {
      return <p className="loading">Loading...</p>;
    }
    if (error) {
      return (
        <div className="error">
          <p>Error fetching data. Please try again.</p>
          <button type="button" onClick={retryFetch}>Retry</button>
        </div>
      );
    }
    const { current } = city;

    return (
      <div>
        <nav className="nav">
          <FaAngleLeft className="arrow-left" />
          <Link to={`/${selectedState}`} className="back" />
          <h2>{`${selectedCity} city`}</h2>
        </nav>
        <p>Weather and air pollution data</p>
        <ul className="details">
          <li className="title">
            Weather Details
          </li>
          <li>
            <span>Temperature</span>
            {current.weather.tp}
            °C
          </li>
          <li>
            <span>Pressure</span>
            {current.weather.pr}
            {' '}
            hPa
          </li>
          <li>
            <span>Humidity</span>
            {current.weather.hu}
            %
          </li>
          <li className="title">
            Pollution Details
          </li>
          <li>
            <span>Air Quality Index (AQI)</span>
            {current.pollution.aqius}
          </li>
          <li>
            <span>Main Pollutant</span>
            {current.pollution.mainus}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default City;
