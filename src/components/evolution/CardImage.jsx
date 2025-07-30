function CardImage({ img, name }) {
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <img
          src={img}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)] transition-transform duration-400 group-hover:scale-110"
        />
        <span
          className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-60 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.35),transparent_70%)] transition"
        />
      </div>
    );
  }
  
  export default CardImage;