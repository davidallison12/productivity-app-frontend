import React from "react";


const Nav = (props) => {
  return (
      <nav class="navbar navbar-expand-lg bg-secondary bg-gradient font-link">
    <img className="navbar-brand" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-success-success-flatart-icons-outline-flatarticons.png" alt="Accompli Logo"/>
    <div>
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link text-light" onClick={props.toggleGoalModal} href="#">
            Add A Goal
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#" onClick={props.toggleTaskModal}>
            Add A Task
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">
           Calendar View
          </a>
        </li>
        {/* <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li> */}
      </ul>
    </div>
    </nav>
  );
};

export default Nav;
