import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { useTheme } from 'next-themes'
import { Star, Users, TrendingUp, Quote } from 'lucide-react'

type Props = {}

const Reviews = (props: Props) => {
  const { theme } = useTheme()
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    satisfactionRate: 0
  })

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=6')
        const data = await response.json()
        
        const formattedReviews = data.results.map((user: any) => {
          const rating = Math.floor(Math.random() * 2) + 4
          return {
            name: `${user.name.first} ${user.name.last}`,
            avatar: user.picture.large,
            rating: rating,
            comment: getRandomComment(),
            profession: getRandomProfession(),
            date: getRandomDate()
          }
        })
        
        setReviews(formattedReviews)
        
        // Calculate stats
        const totalRating = formattedReviews.reduce((sum: number, review: any) => sum + review.rating, 0)
        const averageRating = totalRating / formattedReviews.length
        const satisfactionRate = ((formattedReviews.filter((r: any) => r.rating >= 4).length / formattedReviews.length) * 100)
        
        setStats({
          averageRating: parseFloat(averageRating.toFixed(1)),
          totalReviews: formattedReviews.length,
          satisfactionRate: Math.round(satisfactionRate)
        })
        
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const getRandomComment = () => {
    const comments = [
      "This course completely transformed my career! The instructors are knowledgeable and the content is top-notch.",
      "Excellent learning experience. The practical examples really helped me understand the concepts.",
      "Best investment I've made in my education. Highly recommend to anyone looking to upskill.",
      "The course structure is perfect for beginners and advanced learners alike. Very satisfied!",
      "Outstanding content delivery and support from the instructors. Worth every penny!",
      "I've taken many online courses, but this one stands out. Clear explanations and real-world projects."
    ]
    return comments[Math.floor(Math.random() * comments.length)]
  }

  const getRandomProfession = () => {
    const professions = [
      "Software Developer",
      "Data Scientist",
      "Product Manager",
      "UI/UX Designer",
      "Marketing Manager",
      "Business Analyst"
    ]
    return professions[Math.floor(Math.random() * professions.length)]
  }

  const getRandomDate = () => {
    const dates = [
      "2 days ago",
      "1 week ago",
      "2 weeks ago",
      "1 month ago",
      "2 months ago",
      "3 months ago"
    ]
    return dates[Math.floor(Math.random() * dates.length)]
  }

  return (
    <div className="w-full min-h-screen pt-[80px] pb-20 font-poppins transition-colors font-Poppins duration-300 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" suppressHydrationWarning>
      <div className='w-[95%] md:w-[85%] mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6'>
            <Quote className='w-8 h-8 text-blue-600 dark:text-blue-400' />
          </div>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white'>
            What Our Students Say
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Join thousands of satisfied learners who have transformed their careers with our courses
          </p>
        </div>



        {/* Reviews Grid */}
        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm animate-pulse'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full'></div>
                  <div className='flex-1'>
                    <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4'></div>
                    <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3'></div>
                  </div>
                </div>
                <div className='flex gap-1 mb-4'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className='w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
                  ))}
                </div>
                <div className='space-y-2'>
                  <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded'></div>
                  <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded'></div>
                  <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4'></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {reviews.map((review: any, index: number) => (
                <div key={index} className='group'>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className='mt-12 text-center'>
              <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-8 border border-blue-100/50 dark:border-gray-700/50'>
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-3'>
                  Ready to share your experience?
                </h3>
                <p className='text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto'>
                  Join our community of learners and help others discover the perfect course for their journey.
                </p>
                <button className='px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl'>
                  Write a Review
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Reviews