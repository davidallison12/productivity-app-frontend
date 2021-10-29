import React from "react";
import Menu from "./Menu"; // Dropdown Menu Component

const Nav = (props) => {
  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" onClick={props.toggleGoalModal} href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
