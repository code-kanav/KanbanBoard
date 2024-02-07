import React from 'react';
import "./card.css"
import { FaCircle } from "react-icons/fa";
const Card = ({ ticket , users}) => {
  console.log(users)
  const filteredUser = users.find(user => user.id === ticket.userId);

  return (
    <div className="card">
      <h2>{ticket.id}</h2>
      <h3 className="cardTitle">{ticket.title}</h3>
      <p className="cardTag"><span><FaCircle/></span>{ticket.tag.map((tag)=>tag)}</p>
      <div className="cardUser"><img src="https://picsum.photos/200" className="user"/></div>
    </div>
  );
};

export default Card;
