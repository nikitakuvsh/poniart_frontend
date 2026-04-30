import './styles.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import About from './components/About/About';
import Events from './components/Events/Events';
import Subscribes from './components/Subscribes/Subscribes';
import Where from './components/Where/Where';
import Event from './components/Event/Event';
import AboutSubscribe from './components/AboutSubscribe/AboutSubscribe';

import ScrollHandler from './scrollHandler';

function Home() {
  return (
    <>
      <About />
      <Events />
      <Subscribes />
      <Where />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
    <ScrollHandler />
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/about-subscribe" element={<AboutSubscribe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;