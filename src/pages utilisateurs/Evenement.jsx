import React from 'react'
import { useState } from "react";
import axios from "axios";
import "./Evenement.css"


export default function Evenement() {
     const [dataEvenements, setDataEvenements] = useState([]);
     const [category, setCategory] = useState("all");

    axios
      .get("https://694d3629ad0f8c8e6e200b5b.mockapi.io/api/productEvenement")
      .then(res => {
        setDataEvenements(res.data);
        })
        .catch(err => {
        console.error("Erreur lors de la récupération :", err);
        })
        // Filtrage par catégorie
  const filteredEvents =
      category === "all"
      ? dataEvenements
      : dataEvenements.filter(event => event.category === category);

    
    return (
    <div className="events-page">
      <h2>Événements disponibles</h2>

      {/* FILTRE */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">Toutes les catégories</option>
        <option value="music">Musique</option>
        <option value="sport">Sport</option>
        <option value="art">Art</option>
      </select>
      {/* LISTE DES ÉVÉNEMENTS */}
      <div className="events-list">
        {filteredEvents.map((event)=>(
          <div key={event.id} className='card'>
            <img src={event.image} alt={event.title}/>
            <h3>{event.title}</h3>
            <h2>{event.price} MAD </h2>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <button>Ajouter au panier</button>
          </div>
        ))}
        
      </div>
      
    </div>
  );
}
