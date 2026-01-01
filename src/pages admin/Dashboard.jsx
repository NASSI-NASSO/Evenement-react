import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://694d3629ad0f8c8e6e200b5b.mockapi.io/api/productEvenement")
      .then((res) => setEvents(res.data));
  }, []);

  const deleteEvent = async(id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      try {
    
     await axios .delete(`https://694d3629ad0f8c8e6e200b5b.mockapi.io/api/productEvenement/${id}`)
      .then(() => setEvents(events.filter((e) => e.id !== id)));
       } catch (error) {
        console.error(error);
      }
    }
  };

  const editEvent = (event) => {
    navigate("/admin", { state: event });
  };

  return (
    <div className="cards">
      {events.map((e) => (
        <div className="card" key={e.id}>
          <img src={e.image} alt={e.title} />
          <h3>{e.title}</h3>
          <p>{e.date}</p>
          <p>{e.price} MAD</p>

          <button onClick={() => editEvent(e)}>Modifier</button>
          <button onClick={() => deleteEvent(e.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}
