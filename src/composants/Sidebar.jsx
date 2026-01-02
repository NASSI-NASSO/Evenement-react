import { useSelector } from "react-redux";
import './Sidebar.css'

export default function Sidebar({ isOpen, setIsOpen }) {
  const cart = useSelector(state => state.cart);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h3>Mon panier</h3>

      {cart.length === 0 ? (
        <p>Panier vide</p>
      ) : (
        cart.map(item => (
          <div key={item.id} className="cart-item">
            <p>{item.name}</p>
            <p>Quantité : {item.quantity}</p>
            <p>{item.price} MAD</p>
          </div>
        ))
      )}

      <button onClick={() => setIsOpen(false)}>Fermer</button>
    </div>
  );
}
