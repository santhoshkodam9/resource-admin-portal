import { Routes, Route, NavLink } from "react-router-dom";
import './HomePage.css';
import { Requests } from "./Requests";
import { Resources } from "./Resources";
import { Users } from "./Users";
import { useEffect, useState } from "react";
import resourceService from "../../services/resources-service";

function HomePage() {
  const [searchWord, setSearchWord] = useState('');
  const [resources, setResources] = useState([]);

  const getData = async () => {
    const { data } = await resourceService.getAllResources();
    if (searchWord !== "") {
      const filterData = resources.filter((obj) => obj.title.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()));
      setResources(filterData);
      return;
    }
    setResources(data);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord]);

  function search(e) {
    setSearchWord(e.target.value);
  }
  return (
    <div className="home-page-container">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1"><i className="fas fa-search text-bl" aria-hidden="true"></i></span>
        </div>
        <input className="form-control my-0 py-1 search" type="text" placeholder="Search" aria-label="Search" onKeyUp={(e) => search(e)} />
      </div>
     
      <Routes>
        <Route path="/" element={<Resources dataRecords={resources} />} />
        <Route path="/requests" element={<Requests dataRecords={resources} />} />
        <Route path="/users" element={<Users dataRecords={resources} />} />
      </Routes>

    </div>
  );
}
export const NavBar = () => {
  return (
    <nav className="res-nav">
      <NavLink to="/" className={({ isActive }) => (isActive ? "link-active" : "link")}>Resources</NavLink>
      <NavLink to="/requests" className={({ isActive }) => (isActive ? "link-active" : "link")}>Requests</NavLink>
      <NavLink to="/users" className={({ isActive }) => (isActive ? "link-active" : "link")}>Users</NavLink>
    </nav>
  );
};

export default HomePage;

