// src/componets/Footer/RecentPostFooter.tsx
import Image from "next/image"

export default function RecentPostsSection() {
    const posts = [
      { title: "Is fastfood good for your body?", date: "February 28, 2022", image: "/recentPost.png" },
      { title: "Change your food habit With organic food", date: "February 28, 2022", image: "/recentPost.png" },
      { title: "Do you like fastfood for your life?", date: "February 28, 2022", image: "/recentPost.png" },
    ]
  
    return (
      <div className="w-full">
        <h3 className="text-xl font-bold mb-4 md:mb-8">Recent Post</h3>
        {posts.map((post, index) => (
          <div key={index} className="flex items-center mb-3 md:mb-4">
            <Image 
              src={post.image} 
              alt={post.title} 
              width={64} 
              height={64} 
              className="w-12 h-12 md:w-16 md:h-16 object-cover mr-3 md:mr-4" 
            />
            <div>
              <h4 className="font-semibold text-sm md:text-base mb-1">{post.title}</h4>
              <p className="text-xs md:text-sm text-gray-400">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }





