import React, { FC } from 'react'
import { Star, Calendar, Quote } from 'lucide-react'

type Props = {
  review: any
}

const ReviewCard: FC<Props> = ({ review }) => {
  const renderStars = (rating: number) => {
    return (
      <div className='flex gap-1'>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300 dark:text-gray-700 fill-gray-100 dark:fill-gray-800'
            }`}
            strokeWidth={i < rating ? 0 : 1.5}
          />
        ))}
      </div>
    )
  }

  return (
    <div className='group p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1'>
      {/* Quote Icon */}
      <div className='absolute -top-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity duration-300'>
        <Quote className='w-12 h-12 text-blue-500 dark:text-blue-400' />
      </div>
      
      {/* Header */}
      <div className='flex items-center gap-4 mb-5'>
        <div className='relative'>
          <img 
            src={review.avatar} 
            alt={review.name}
            className='w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md'
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${review.name}&background=random`
            }}
          />
          <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-[#37a39a] to-[#2d8b7f] rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center'>
            <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
            </svg>
          </div>
        </div>
        
        <div className='flex-1'>
          <h3 className='font-bold text-lg text-gray-900 dark:text-white group-hover:text-[#37a39a] dark:group-hover:text-[#2d8b7f] transition-colors duration-300'>
            {review.name}
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {review.profession}
          </p>
        </div>
      </div>

      {/* Rating & Date */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2'>
          {renderStars(review.rating)}
          <span className='text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1'>
            {review.rating.toFixed(1)}
          </span>
        </div>
        
        <div className='flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500'>
          <Calendar className='w-3 h-3' />
          <span>{review.date}</span>
        </div>
      </div>

      {/* Review Content */}
      <div className='relative'>
        <div className='absolute -left-1 top-0 text-blue-500/30 dark:text-blue-400/30'>
          
        </div>
        <p className='text-sm leading-relaxed text-gray-700 dark:text-gray-300 pl-3 italic line-clamp-4'>
          {review.comment}
        </p>
        <div className='absolute -right-1 bottom-0 text-blue-500/30 dark:text-blue-400/30'>
          
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className='mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/50'>
        <div className='w-1/3 h-1 bg-gradient-to-r from-[#37a39a] to-transparent rounded-full'></div>
      </div>
    </div>
  )
}

export default ReviewCard