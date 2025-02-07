// src/components/BlogPages/BlogCart.tsx
import Image from 'next/image';
import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
  imageSrc: string;
  date?: string;
  title?: string;
  description?: string;
  adminName?: string;
}

const BlogCard: FC<BlogCardProps> = ({
  imageSrc,
  date = '14-Feb-2022',
  title = '10 Reasons To Do A Digital Detox Challenge',
  description = 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet...',
  adminName = 'Admin'
}) => {
  return (
    <div className='w-full md:w-[700px] transform transition-transform duration-300 hover:scale-[1.02] mb-8 bg-white shadow-lg rounded-lg overflow-hidden'>
      {/* Image Section */}
      <div className='relative w-full h-[300px] md:h-[400px]'>
        {/* Label */}
        <div className='absolute top-4 left-4 bg-[#FF9F0D] text-white px-4 py-2 text-sm font-medium rounded-md z-10 shadow-md'>
          {date}
        </div>
        <Image
          src={imageSrc}
          alt='Blog Image'
          layout='fill'
          objectFit='cover'
          className='object-cover transition-transform duration-300 hover:scale-105'
        />
      </div>

      {/* Text Content */}
      <div className='p-6'>
        {/* Date and Admin Info */}
        <div className='flex flex-wrap gap-4 items-center text-[14px] md:text-[16px] font-normal text-gray-600'>
          <div className='flex items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2 text-[#FF9F0D]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
            </svg>
            {date}
          </div>
          <div className='flex items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2 text-[#FF9F0D]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
            </svg>
            <span>3 Views</span>
          </div>
          <div className='flex items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2 text-[#FF9F0D]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
            </svg>
            {adminName}
          </div>
        </div>

        {/* Title */}
        <h2 className='mt-4 text-xl md:text-2xl font-bold text-gray-900 hover:text-[#FF9F0D] transition-colors duration-300'>
          {title}
        </h2>

        {/* Divider */}
        <div className='my-4 border-b border-gray-200'></div>

        {/* Description */}
        <p className='text-[14px] md:text-[16px] leading-relaxed text-gray-600'>
          {description}
        </p>

        {/* Read More Button */}
        <Button className='mt-6 group flex items-center px-4 py-2 border-2 border-[#FF9F0D] rounded-lg text-[#FF9F0D] hover:bg-[#FF9F0D] hover:text-white transition-all duration-300'>
          <span className='text-[14px] md:text-[16px] font-medium'>Read More</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;








