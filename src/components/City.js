import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { API_URL, API_KEY } from '../api';
import { setCity } from '../redux/city/citySlice';

const City = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city);
  const { state: selectedState, city: selectedCity } = useParams();

  const fetchData = useCallback(async () => {
    const res = await fetch(`${API_URL}/city?city=${selectedCity}&state=${selectedState}&country=Canada&key=${API_KEY}`);

    const data = await res.json();
    dispatch(setCity(data.data));
  }, [dispatch, selectedState, selectedCity]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { current } = city;

  return (
    <div>
      <Link to={`/${selectedState}`}>Back</Link>
      <h2>{`${selectedCity} air pollution data`}</h2>
      <div>
        <div>
          <h3>Weather Details</h3>
          <p>Temperature:{current.weather.tp}°C</p>
          <p>Pressure:{current.weather.pr} hPa</p>
          <p>Humidity:{current.weather.hu}%</p>
        </div>
        <div>
          <h3>Pollution Data</h3>
          <p>Air Quality Index (AQI):{current.pollution.aqius}</p>
          <p>Main Pollutant:{current.pollution.mainus}</p>
        </div>
      </div>
    </div>
  );
};

export default City;