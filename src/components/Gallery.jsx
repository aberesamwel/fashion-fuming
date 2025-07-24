const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1520962910075-96fbc6a31f71?auto=format&fit=crop&w=600&q=80",
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Fashion Gallery
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Gallery ${idx}`}
            className="rounded-lg shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
