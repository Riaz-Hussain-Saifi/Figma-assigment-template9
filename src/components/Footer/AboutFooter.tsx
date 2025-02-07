// src/componets/Footer/AboutFooter.tsx
import { Clock } from 'lucide-react'

export default function AboutUsSection() {
  return (
    <div className='w-full'>
      <h3 className="text-xl font-bold mb-4 md:mb-8">About Us.</h3>
      <p className="mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
        Corporate clients and leisure travelers have been relying on Groundlink for dependable safe, and professional chauffeured car service in major cities across World.
      </p>
      <div className="flex items-center space-x-4">
        <div className="bg-[#FF9F0D] p-2 rounded w-16 h-16 md:w-[77.23px] md:h-[70.79px] flex items-center justify-center">
          <Clock className="text-white" size={32} />
        </div>
        <div>
          <h4 className="font-semibold mb-1">Opening Hours</h4>
          <p className="text-xs md:text-sm">Mon - Sat(8.00 - 6.00)</p>
          <p className="text-xs md:text-sm">Sunday - Closed</p>
        </div>
      </div>
    </div>
  )
}



