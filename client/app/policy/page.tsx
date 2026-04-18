"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Policy from './Policy'
import Footer from '../components/Route/Footer';
type Props = {}

const Page = (props: Props) => {
    const[open, setOpen] = useState(false);
    const[route, setRoute] = useState("Login");
    const[activeItem, setActiveItem] = useState(3);
  return (
    <div>
        <Heading 
        title="Policy - Learnify"
        description="Learnify is a learning managment system for helping programmers"
        keywords="programming, mern"
        />
        <Header 
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
        activeItem={activeItem}
        />

        <Policy />
              <Footer/>
        
    </div>
  )
}

export default Page