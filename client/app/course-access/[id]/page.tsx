"use client";

import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CourseContent from "../../components/Course/CourseContent";

type Props = {
    params: {
        id: string;
    };
};

const Page = ({ params }: Props) => {
    const router = useRouter();
    const id = params.id;

    const { isLoading, error, data } = useLoadUserQuery(undefined,{});

    useEffect(() => {
        if (error) {
            router.push("/");
            return;
        }

        if (data) {
            const isPurchased = data.user.courses.some(
                (item: any) => item._id === id
            );

            if (!isPurchased) {
                router.push("/");
            }
        }
    }, [data, error, id, router]);

    if (isLoading) return <Loader />;

    return <CourseContent id={id} user={data?.user}/>;
};

export default Page;
