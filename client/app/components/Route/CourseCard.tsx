import Ratings from '@/app/utils/Ratings'
import { Users } from 'lucide-react'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
    item: any
    isProfile ?: boolean
  
}

const CourseCard  : FC<Props> = ({ item, isProfile = false,  }) => {
  return (
     <div className='rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform cursor-pointer bg-white dark:bg-gray-800'>
  <Link href={isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}>
    <div className='relative h-48 overflow-hidden'>
      <img 
        src={item?.thumbnail?.url} 
        alt={item.name || item.title}
        className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
      />
      <div className='absolute top-4 right-4 bg-[#37a39a] text-white px-3 py-1 rounded-full text-sm font-semibold'>
        {item.price === 0 ? "Free" : `$${item.price}`}
      </div>
    </div>

    <div className='p-6'>
      <h3 className='text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white'>
        {item?.name}
      </h3>

      <p className='text-sm mb-4 line-clamp-2 text-gray-600 dark:text-gray-300'>
        {item.description}
      </p>

      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-1'>
          <Ratings rating={item.ratings} />
          <span className='text-sm ml-2 text-gray-600 dark:text-gray-300'>
            {item.ratings?.toFixed(1) || "0.0"}
          </span>
        </div>
        
        {!isProfile && (
          <div className='flex items-center gap-1'>
            <Users size={16} className='text-gray-500 dark:text-gray-400' />
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              {item.purchased || 0}
            </span>
          </div>
        )}
      </div>
      
      <div className='mb-4'>
        <div className='flex items-center gap-2 text-sm'>
          <span className='text-gray-700 dark:text-gray-300 font-medium'>Price:</span>
          <span className='text-[#37a39a] font-bold'>{item.price}$</span>
          {item.estimatedPrice && item.estimatedPrice > item.price && (
            <span className='ml-2 text-gray-500 dark:text-gray-400 line-through'>
              {item.estimatedPrice}$
            </span>
          )}
        </div>
      </div>
      
      <button className='w-full py-3 bg-gradient-to-r from-[#37a39a] to-[#2d8b7f] text-white rounded-lg font-semibold hover:from-[#2d8b7f] hover:to-[#1f6b5f] transition-all duration-300 shadow-md hover:shadow-lg'>
        {isProfile ? 'Access Course' : 'View Details'}
      </button>
    </div>
  </Link>
</div>
  )
}

export default CourseCard