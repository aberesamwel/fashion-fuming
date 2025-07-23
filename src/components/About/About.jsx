// src/components/About.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import teamMembers from '../Data/teammembers';

Modal.setAppElement("#root");

// ... rest of the About component (same as before)

const About = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  // Preload team member images
  useEffect(() => {
    const imageCache = new Map();
    teamMembers.forEach((member) => {
      if (!imageCache.has(member.img)) {
        const img = new Image();
        img.src = member.img;
        imageCache.set(member.img, img);
      }
    });
  }, []);

  const features = [
    {
      title: 'Global Gallery',
      iconPath:
        'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      description:
        'Explore curated fashion collections that highlight cultural styles from every corner of the globe.',
    },
    {
      title: 'Fashion Events',
      iconPath:
        'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      description:
        'Attend exclusive fashion shows, workshops, and cultural celebrations hosted worldwide.',
    },
    {
      title: 'Secure Access',
      iconPath:
        'M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 2.896 2 4zm0 0c0 1.104-.896 2-2 2s-2-.896-2-2m4 0c0 1.104-.896 2-2 2s-2-.896-2-2',
      description:
        'Enjoy a safe, personalized experience with our secure login and membership features.',
    },
    {
      title: 'Easy Navigation',
      iconPath:
        'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      description:
        'Seamlessly explore our platform with quick access to resources, contacts, and social channels.',
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10">
          About
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Fashion Fusion celebrates the vibrant diversity of fashion from cultures around the world...
        </p>
        <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          We believe fashion is more than just clothes...
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {features.map((feature, i) => (
            <div
              key={i}
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
                  <path d={feature.iconPath} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Team Slider */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Meet Our Team</h3>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Our passionate administrators are dedicated to nurturing a vibrant community...
          </p>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="pb-12"
          >
            {teamMembers.map((admin, i) => (
              <SwiperSlide key={i}>
                <div
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 text-center cursor-pointer"
                  onClick={() => setSelectedMember(admin)}
                >
                  <img
                    src={admin.img}
                    alt={admin.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">{admin.name}</h4>
                  <p className="text-indigo-600 text-sm">{admin.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Modal */}
          {selectedMember && (
            <Modal
              isOpen={true}
              onRequestClose={() => setSelectedMember(null)}
              contentLabel="Team Member Details"
              className="max-w-lg mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg relative outline-none"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              <img
                src={selectedMember.img}
                alt={selectedMember.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold text-center text-gray-800 mb-2">
                {selectedMember.name}
              </h4>
              <p className="text-center text-indigo-600 mb-4">{selectedMember.role}</p>
              <p className="text-gray-700 text-center">{selectedMember.desc}</p>
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;