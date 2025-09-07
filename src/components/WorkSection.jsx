import { useState } from "react";

const projects = [
  { id: 1, image: "/projects/project1.png" },
  { id: 2, image: "/projects/project2.png" },
  { id: 3, image: "/projects/project3.png" },
  { id: 4, image: "/projects/1.png" },
  { id: 5, image: "/projects/2.PNG" },
  { id: 6, image: "/projects/3.PNG" },
  { id: 7, image: "/projects/4.PNG" },
  { id: 8, image: "/projects/5.png" },
  { id: 9, image: "/projects/6.png" },
  { id: 10, image: "/projects/7.png" },
  { id: 11, image: "/projects/8.png" },
  { id: 12, image: "/projects/9.png" },
  { id: 13, image: "/projects/10.png" },
  { id: 14, image: "/projects/11.png" },
  { id: 15, image: "/projects/12.png" },
  { id: 16, image: "/projects/13.png" },
  { id: 17, image: "/projects/14.PNG" },
  { id: 18, image: "/projects/15.png" },
];

export const WorkSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const openImage = (img) => {
    setSelectedImage(img);
    setIsVisible(true);
  };

  const closeImage = () => {
    setIsVisible(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  return (
    <section id="work" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Work</span>
        </h2>

        {/* Галерея */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative overflow-hidden rounded-lg cursor-pointer shadow-lg border-2 border-primary transition-transform duration-300 hover:scale-105 work-card"
              onClick={() => openImage(project.image)}
            >
              <img
                src={project.image}
                alt={`Work ${project.id}`}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110 rotate-card"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Модальное окно */}
        {selectedImage && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeImage}
          >
            <img
              src={selectedImage}
              alt="Enlarged work"
              className={`max-h-[90%] max-w-[90%] rounded-lg shadow-2xl transition-transform duration-300 ${
                isVisible ? "scale-100" : "scale-90"
              }`}
            />
          </div>
        )}
      </div>

      {/* Встроенные стили для тряски и вращения */}
      <style>
        {`
          /* Тряска при наведении */
          .work-card:hover {
            animation: shake 0.4s ease-in-out infinite;
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            50% { transform: translateX(2px); }
            75% { transform: translateX(-2px); }
          }

          /* Лёгкое плавное вращение карточек */
          .rotate-card {
            animation: floatRotate 6s ease-in-out infinite alternate;
            transform-origin: center;
          }

          @keyframes floatRotate {
            0% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
            100% { transform: rotate(-3deg); }
          }
        `}
      </style>
    </section>
  );
};
