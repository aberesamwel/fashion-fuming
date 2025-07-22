import React from 'react';





function About() {
  return (
    <>
   <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10">
      About 
    </h2>

    <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
      Fashion Fusion celebrates the vibrant diversity of fashion from cultures around the world. 
      Our platform was created to connect consumers with the stories, traditions, and innovations behind global fashion trends — from haute couture runways to grassroots streetwear.  
    </p>

    <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
      We believe fashion is more than just clothes; it's a powerful form of cultural expression and community. Our mission is to provide an inclusive space where style enthusiasts, designers, and trendsetters can discover, share, and celebrate fashion’s rich heritage and future.
    </p>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
      {[
        {
          title: "Global Gallery",
          icon: (
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          ),
          description: "Explore curated fashion collections that highlight cultural styles from every corner of the globe.",
        },
        {
          title: "Fashion Events",
          icon: (
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          ),
          description: "Attend exclusive fashion shows, workshops, and cultural celebrations hosted worldwide.",
        },
        {
          title: "Secure Access",
          icon: (
            <path d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 2.896 2 4zm0 0c0 1.104-.896 2-2 2s-2-.896-2-2m4 0c0 1.104-.896 2-2 2s-2-.896-2-2" />
          ),
          description: "Enjoy a safe, personalized experience with our secure login and membership features.",
        },
        {
          title: "Easy Navigation",
          icon: (
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          ),
          description: "Seamlessly explore our platform with quick access to resources, contacts, and social channels.",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center"
        >
          <div className="mb-4">
            <svg
              className="w-12 h-12 mx-auto text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {feature.icon}
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>

    {/* Administrators */}
    <div className="text-center">
      <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        Meet Our Team
      </h3>
      <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        Our passionate administrators are dedicated to nurturing a vibrant community that honors cultural diversity and fashion innovation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          {
            name: "Jane Doe",
            role: "Lead Administrator",
            img: "https://via.placeholder.com/150",
            desc: "Jane leads community engagement, ensuring every voice is heard and celebrated.",
          },
          {
            name: "John Smith",
            role: "Technical Administrator",
            img: "https://via.placeholder.com/150",
            desc: "John keeps the platform running smoothly and securely behind the scenes.",
          },
          {
            name: "Emma Wilson",
            role: "Events Coordinator",
            img: "https://via.placeholder.com/150",
            desc: "Emma organizes inspiring fashion events that connect cultures and creativity worldwide.",
          },
        ].map((admin, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center"
          >
            <img
              src={admin.img}
              alt={admin.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h4 className="text-xl font-semibold text-gray-800">{admin.name}</h4>
            <p className="text-indigo-600 font-medium mb-2">{admin.role}</p>
            <p className="text-gray-600 text-sm">{admin.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


    </>
  );
}

export default About;
     