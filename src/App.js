import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import States from './components/States';
import Cities from './components/Cities';
import City from './components/City';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<States />} />
        <Route path="/state" element={<Cities />} />
        <Route path="/state/:city" element={<City />} />
      </Routes>
    </div>
  );
}

export default App;
