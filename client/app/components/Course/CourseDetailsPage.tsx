import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Route/Footer";
import CourseDetail from "./CourseDetail";
type Props={
id:string
}
const CourseDetailsPage = ({id}: Props) => {
    const [route, setRoute] = useState('Login');
    const [open, setOpen] = useState(false);
    const {data, isLoading, isError}=useGetCourseDetailsQuery({id});


  return <>
  {isLoading ? <Loader/>: 
  (
<div>
    <Heading  title={data.course.name+ " - Elearning"} description="E learing is community where people learn with parctical implementation" keywords={data?.course?.tags}/>
    <Header 
    route={route}
    setRoute={setRoute}
    open={open}
    setOpen={setOpen}
    activeItem={1}
    />
    <CourseDetail data={data.course}/>
    <Footer/>
</div>  
)
  }
  </>
}

export default CourseDetailsPage