function Card({ image, name, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={name} className="card-image" />
      <p className="card-name">{name}</p>
    </div>
  );
}

export default Card;
