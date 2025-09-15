// src/components/WorkSection.jsx
import { useEffect, useState } from "react";
import { databases, QueryBuilder } from "../lib/appwrite";

const staticProjects = [ /* ваш массив static как раньше */ ];

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const WorkSection = () => {
  const [projects, setProjects] = useState(staticProjects);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await databases.listDocuments(DB_ID, COLLECTION_ID, [
          QueryBuilder.orderDesc("createdAt"),
          QueryBuilder.limit(100)
        ]);
        const remote = res.documents.map(doc => ({ id: doc.$id, image: doc.image }));
        if (!cancelled) setProjects([...remote, ...staticProjects]);
      } catch (err) {
        console.error("Appwrite DB error:", err);
        if (!cancelled) setProjects(staticProjects);
      }
    };

    load();
    return () => { cancelled = true; }
  }, []);

  const openImage = (img) => { setSelectedImage(img); setIsVisible(true); };
  const closeImage = () => { setIsVisible(false); setTimeout(()=>setSelectedImage(null),300); };

  return (
    <section id="work" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Work</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.id ?? idx}
              className="relative overflow-hidden rounded-lg cursor-pointer shadow-lg border-2 border-primary transition-transform duration-300 hover:scale-105 work-card"
              onClick={()=>openImage(project.image)}
            >
              <img
                src={project.image}
                alt={`Work ${idx+1}`}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110 rotate-card"
                loading="lazy"
              />
            </div>
          ))}
        </div>

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

      {/* вернул shake + floatRotate */}
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
