import { useState, useRef , useEffect  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css"
export default function Admin() {
    const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    price: "",
    image: null,
    description: ""
  }); 
  const fileRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  // 🔹 PRE-REMPLIR SI ON VIENT DE "MODIFIER"
  useEffect(() => {
    if (location.state) {
      setEvent(location.state);
    }
  }, [location.state]);
 // gérer les changements
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setEvent({
      ...event,
      [name]: files ? files[0] : value
    });
  };
     // upload image vers Cloudinary
     const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "react_upload");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dmc3tdoll/image/upload",
      formData
    );

    return res.data.secure_url;
  }

  const  handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage(event.image);
    const newEvent = {
  ...event,
  image: imageUrl
}; 
if (event.id) {
      // ✏️ MODIFIER
      await axios.put(
        `https://694d3629ad0f8c8e6e200b5b.mockapi.io/api/productEvenement/${event.id}`,
        newEvent
      );
    } else {

     await axios.post("https://694d3629ad0f8c8e6e200b5b.mockapi.io/api/productEvenement", newEvent)};
 setEvent({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "",
    price: "",
    image: null,
    description: ""
  });
   if (fileRef.current) fileRef.current.value = "";

    navigate("/dashboard");
    };

  return (
    <div className="add-event">
      <h2>Ajouter un événement</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre </label>
        <input name="title" value={event.title} onChange={handleChange} />
        <label>Date </label>
        <input type="date" name="date" value={event.date} onChange={handleChange} />
        <label>Time </label>
        <input type="time" name="time" value={event.time} onChange={handleChange} />
        <label>Location </label>
        <input name="location" value={event.location} onChange={handleChange} />
        <label>Categore </label>
        <input name="category" value={event.category} onChange={handleChange} />
        <label>prix </label>
        <input type="number" name="price" value={event.price} onChange={handleChange} />

        <input type="file" name="image" ref={fileRef} onChange={handleChange} />

        <textarea name="description" value={event.description} onChange={handleChange} />

        <button type="submit"> {event.id ? "Modifier" : "Ajouter"}</button>
    </form>
    </div>
  )
  }