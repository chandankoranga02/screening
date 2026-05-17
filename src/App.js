import './App.css';
import Navbar from './components/navbar';
import CinematicExperience from './components/CinematicExperience';
import WhoShouldEnroll from './components/WhoShouldEnroll';
import Faq from './components/faq';

function App() {
  return (
    <div className="relative bg-[#040816]">
      <Navbar />
      <CinematicExperience />
      <WhoShouldEnroll />
      <Faq />
    </div>
  );
}

export default App;
