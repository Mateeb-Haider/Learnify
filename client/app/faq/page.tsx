"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Faqs from '../components/Route/Faqs';

type Props = {}

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="FAQS- Learnify"
        description="Learnify is a learning managment system for helping programmers"
        keywords="programming, mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />

      <Faqs />
    </div>
  );
};

export default Page