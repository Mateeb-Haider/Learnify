'use client'
import { use } from 'react'
import CourseDetailsPage from '../../components/Course/CourseDetailsPage'
import { useParams } from 'next/navigation'

const Page = ({params}:any) => {
  
  return <div>
    <CourseDetailsPage id={params.id}/>
  </div>
}

export default Page
