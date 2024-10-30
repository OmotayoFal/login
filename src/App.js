import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./Components/Login/Login";
import Analytics from "./Components/Analytics/Analytics"; 
import Projects from "./Components/Projects/Projects"; 
import ToDo from './Components/ToDo/ToDo';
import Home from "./Components/Home/Home"; // Home contains the sidebar and sub-routes
import Register from './Components/Login/Register';
import ProfilePage from './Components/user/ProfilePage';  // Import the ProfilePage component
//import './profileIndex.css';  // Import the associated CSS for ProfilePage
const isAdmin = true; 


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Default route for login */}
          <Route path="/projects" element={<Projects />} />  {/* Route for the dashboard (contains sidebar) */}
          <Route path="/register" element={<Register />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfilePage isAdmin={isAdmin} />} />
         </Routes>
      </div>
     
    </Router>
  );
}

export default App;
