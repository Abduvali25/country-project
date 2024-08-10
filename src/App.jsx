import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./components/Home";
import Country from "./components/Country";
import Header from "./components/Header";

function App() {
  return (
    <main className="">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:countryCode" element={<Country />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
