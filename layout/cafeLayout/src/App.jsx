import React from "react";
import "./layout.css";

const cafeData = [
  {
    name: "DOZA Coffee",
    openHours: 8,
    closeHours: 21,
    rating: 5.0,
    category: "Coffee shop",
    photoName: "/images/DOZA.png",
  },
  {
    name: "The Spiceroom",
    openHours: 8,
    closeHours: 22,
    rating: 4.8,
    category: "Coffee shop",
    photoName: "/images/TheSpiceroom.png",
  },
  {
    name: "Eclair",
    openHours: 10,
    closeHours: 22,
    rating: 4.5,
    category: "Cafe",
    photoName: "/images/Eclair.png",
  },
  {
    name: "Classic",
    openHours: 11,
    closeHours: 22,
    rating: 4.5,
    category: "Restaurant",
    photoName: "/images/classic.png",
  },
];

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">COFFEED</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">Stay tuned :)</p>
    </footer>
  );
}

function CafeCard({
  name,
  openHours,
  closeHours,
  rating,
  category,
  photoName,
}) {
  const hour = new Date().getHours();
  const isOpen = hour >= openHours && hour <= closeHours;

  return (
    <li className="cafeCard">
      <img src={photoName} alt={name} />
      <div className="cafeCard-content">
        <h3>{name}</h3>
        <div className="cafeCard-meta">
          <span>{rating} ⭐</span>
          <span>{category}</span>
        </div>
        <span className="isOpen">
          {isOpen ? <p>Open until {closeHours}:00</p> : <p>Closed</p>}
        </span>
      </div>
    </li>
  );
}

function CafeList() {
  return (
    <ul className="cafes">
      {cafeData.map((cafe) => (
        <CafeCard key={cafe.name} {...cafe} />
      ))}
    </ul>
  );
}

function App() {
  return (
    <div className="container">
      <Header />
      <main className="cafeList">
        <CafeList />
        <div className="rightImage">
          <img src="/images/maps.jpg " />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
