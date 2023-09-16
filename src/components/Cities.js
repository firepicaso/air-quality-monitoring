import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { API_URL, API_KEY } from '../api';
import { setCities } from '../redux/cities/citiesSlice';

const Cities = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const { state: selectedState } = useParams();

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `${API_URL}/cities?state=${selectedState}&country=Canada&key=${API_KEY}`,
    );

    const data = await res.json();
    dispatch(setCities(data.data));
  }, [dispatch, selectedState]);

  useEffect(() => {
    fetchData();
  }, [fetchData, selectedState]);

  return (
    <ul>
      {cities.map((city) => (
        <li key={city.city}>
          <Link to={`/${selectedState}/${city.city}`}>
            {city.city}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Cities;
