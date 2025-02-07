import React from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

interface Chef {
  _id: string;
  name: string;
  image: string;
  role: string;
  available: boolean;
  experience: string;
  specialty: string;
  description: string;
}

export default async function ChefGrid() {
  const chefs = await client.fetch<Chef[]>(`*[_type == 'chef'][]{
    "image": image.asset->url,
    _type,
    name,
    available,
    experience,
    specialty,
    description,
    _id
  }`);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {chefs.map((chef, index) => (
          <article
            key={chef._id}
            className={`group relative bg-white rounded-xl shadow-md overflow-hidden 
              transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-4px]
              ${index === 6 ? "ring-2 ring-purple-600" : "hover:ring-2 hover:ring-purple-600"}`}
          >
            {/* Image Container with Fixed Height */}
            <div className="w-full h-64 sm:h-72 relative">
              <Image
                src={chef.image}
                alt={`Chef ${chef.name}`}
                fill
                priority={index < 4}
                className="object-cover w-full h-full"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={90}
              />
              {chef.available && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Available
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg text-gray-900 truncate">
                {chef.name}
              </h3>
              {chef.specialty && (
                <p className="text-sm text-gray-600 truncate">{chef.specialty}</p>
              )}
              {chef.experience && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{chef.experience} Experience</span>
                </div>
              )}
              {chef.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {chef.description}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}