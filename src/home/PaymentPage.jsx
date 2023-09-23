import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../public/assets/css/payment.css";

const PaymentPage = (props) => {
  const accessToken = useSelector((state) => state.auth.token);
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const history = useHistory();

  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentIntentClientSecret = location.state
    ? location.state.paymentIntentClientSecret
    : null;

  const paymentAmount = location.state ? location.state.paymentAmount : null;

  useEffect(() => {
    // Ensure that the client secret is passed from the previous component
    if (!paymentIntentClientSecret) {
      // Redirect the user to the previous page or handle this case as needed
      history.push("/");
    }
  }, [paymentIntentClientSecret, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission or show a loading indicator.
      return;
    }

    // Confirm the PaymentIntent on the server using the client secret
    try {
      const result = await stripe.confirmCardPayment(
        paymentIntentClientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        // Payment failed
        console.error(result.error);
        setPaymentError(result.error.message);
      } else {
        // Payment succeeded
        console.log("Payment succeeded:", result.paymentIntent);
        setPaymentSuccess(true);

        // Trigger the /subscribe API call with the userId
        try {
          const subscribeResponse = await axios.patch(
            "https://formulabasetrader.com/api/user/subscribe",
            null,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );

          if (subscribeResponse.data.user.subscription[0].subscribed) {
            setTimeout(() => {
              history.push("/");
            }, 2500); // Adjust the delay as needed
          } else {
            // Handle subscription error
            console.error("Subscription failed:", subscribeResponse.data.error);
            setPaymentError("Subscription failed. Please contact support.");
          }
        } catch (subscribeError) {
          console.error("Error subscribing user:", subscribeError);
          setPaymentError("Subscription failed. Please contact support.");
        }
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      setPaymentError("Payment failed. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      {paymentAmount && (
        <p className="payment-amount">Payment Amount: ₹{paymentAmount}</p>
      )}
      <form onSubmit={handleSubmit}>
        <CardElement className="card-element" />
        {paymentError && <div className="payment-error">{paymentError}</div>}
        <button type="submit" className="payment-button" disabled={!stripe}>
          Pay
        </button>
      </form>
      {paymentSuccess && (
        <div className="payment-success-message">
          Payment was successful!
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
