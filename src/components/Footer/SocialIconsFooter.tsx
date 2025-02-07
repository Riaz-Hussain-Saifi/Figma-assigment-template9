// src/componets/Footer/SocialIconsFooter.tsx
import { Facebook, Twitter, Instagram, Youtube, PinIcon } from 'lucide-react'
import Link from "next/link"

export default function SocialIcons() {
  const icons = [
    { Icon: Facebook, color: 'text-[#1E1E1E]' },
    { Icon: Twitter, color: 'text-[#1E1E1E]' },
    { Icon: Instagram, color: 'text-[#1E1E1E]' },
    { Icon: Youtube, color: 'text-[#FF9F0D]' },
    { Icon: PinIcon, color: 'text-[#1E1E1E]' },
  ]

  return (
    <div className="flex justify-center space-x-2 md:space-x-4">
      {icons.map(({ Icon, color }, index) => (
        <Link
          key={index}
          href="#"
          className={`bg-white p-1.5 md:p-2 rounded ${color} hover:bg-[#FF9F0D] hover:text-white transition duration-300`}
        >
          <Icon size={16} />
        </Link>
      ))}
    </div>
  )
}






