// src/componets/HomePages/FoodCatagery.tsx
import { Great_Vibes } from "next/font/google";
import Image from "next/image";

const VibeFont = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

const FoodCategory = () => {
  return (
    <div className="bg-black min-h-screen w-full">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <p className={`${VibeFont.className} text-[#FF9F0D] text-4xl mb-4 animate-fade-in`}>
            Food Category
          </p>
          <h1 className="text-white text-5xl font-bold">
            <span className="text-[#FF9F0D]">Ch</span>oose Food Item
          </h1>
        </div>

        {/* Food Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {['/food1.png', '/food2.png', '/food3.png', '/food4.png'].map((src, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl">
              <div className="aspect-w-1 aspect-h-1">
                <Image
                  src={src}
                  alt={`Category ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Grid */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Image
                  src="/paratha.png"
                  alt="paratha"
                  width={500}
                  height={400}
                  className="rounded-xl"
                />
              </div>
              <div>
                <Image
                  src="/burger-real.png"
                  alt="burger"
                  width={240}
                  height={200}
                  className="rounded-xl"
                />
              </div>
              <div>
                <Image
                  src="/kabab.png"
                  alt="kabab"
                  width={200}
                  height={250}
                  className="rounded-xl"
                />
              </div>
              <div>
                <Image
                  src="/cheezburger.png"
                  alt="burger2"
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-4">
                <Image
                  src="/raita.png"
                  alt="raita"
                  width={160}
                  height={160}
                  className="rounded-xl"
                />
                <Image
                  src="/lastpic.png"
                  alt="last-pic"
                  width={160}
                  height={160}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <p className={`${VibeFont.className} text-[#FF9F0D] text-3xl mb-4`}>
                Why Choose us
              </p>
              <h2 className="text-white text-4xl font-bold mb-6">
                Extraordinary taste And Experience
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque 
                bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat 
                pretium donec id elementum.
              </p>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: "/Hamburger.png", title: "Fast Food" },
                { icon: "/Cookie.png", title: "Lunch" },
                { icon: "/Wine.png", title: "Dinner" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-[#FF9F0D] rounded-xl p-6 mb-4 transform hover:scale-105 transition-transform duration-300">
                    <Image src={item.icon} alt={item.title} width={56} height={56} />
                  </div>
                  <p className="text-white font-medium">{item.title}</p>
                </div>
              ))}
            </div>

            {/* Experience Badge */}
            <div className="bg-white rounded-xl p-6 flex items-center justify-center gap-8 max-w-md">
              <span className="text-[#FF9F0D] text-5xl font-bold">30+</span>
              <div>
                <p className="text-gray-600">Years of</p>
                <p className="text-black font-bold text-xl">Experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          {[
            { icon: "/cap.png", title: "Professional Chefs", count: "420" },
            { icon: "/burger.png", title: "Best Drinks", count: "320" },
            { icon: "/spon.png", title: "Serving Tools", count: "30+" },
            { icon: "/pizza.png", title: "Delicious Pizza", count: "220" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <Image src={stat.icon} alt={stat.title} width={120} height={120} />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{stat.title}</h3>
              <p className="text-[#FF9F0D] text-4xl font-bold">{stat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodCategory;









