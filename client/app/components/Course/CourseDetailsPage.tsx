import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Route/Footer";
import CourseDetail from "./CourseDetail";
import {
  useCreatePaymetIntentMutation,
  useGetStripePublishAbleKeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
type Props = {
  id: string;
};
const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, isError } = useGetCourseDetailsQuery({ id });
  const { data: config } = useGetStripePublishAbleKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymetIntentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.stripePublishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data?.course?.price * 100);
      console.log(data);
      createPaymentIntent(amount);
    }
  }, [data, config]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + " - Elearning"}
            description="E learing is community where people learn with parctical implementation"
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <CourseDetail
              data={data?.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
