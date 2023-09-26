import { CreditCardIcon, WalletIcon } from "../systemdesign/Icons";
import { Vector } from "../systemdesign/image";
import { useState } from "react";
import { useBooking } from "../../contexts/BookingContext";

import axios from "axios";
import Script from "react-load-script";
let OmiseCard;

function Booking3() {
  const { paymentMethod, setPaymentMethod, totalAmount, setConfirmbooking } =
    useBooking();

  const [credit, setCredit] = useState(null);
  const [wallet, setWallet] = useState("#ff7037");

  const handleCreditClick = () => {
    setPaymentMethod("Credit");
    setWallet(null);
  };
  const handleCashClick = () => {
    setPaymentMethod("Cash");
    setCredit(null);
  };

  const handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey: "pkey_test_5x5w3xryolrnev4hk37",
      currency: "THB",
      frameLabel: "Pet Sitter",
      submitLabel: "Pay Now",
      buttonLabel: "Pay with Omise",
    });
  };

  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omiseCardHandler = () => {
    OmiseCard.open({
      amount: totalAmount * 100,
      onCreateTokenSuccess: async (token) => {
        const result = await axios.post(`http://localhost:4000/pamentGateway`, {
          amount: totalAmount * 100,
          token: token,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result.data.status == "successful") {
          alert("Payment Successful");
        } else {
          alert("Payment Failed");
        }
        console.log(result.data.status);
        setConfirmbooking(result.data.status);
      },
      onFormClosed: () => {},
    });
  };

  return (
    <>
      <div className="bg-etc-white h-fit p-10">
        <div className="flex justify-between w-full mb-12 ">
          <div
            className={`own-form w-[376px] h-20 rounded-[999px] shadow border hover:border-orange-500 
          
            ${
              paymentMethod === "Credit"
                ? "border-orange-500 text-orange-500"
                : ""
            }`}
          >
            <Script
              url="https://cdn.omise.co/omise.js"
              onLoad={handleLoadScript}
            />
            <form className=" flex justify-center items-center w-full h-full relative">
              <button
                id="credit-card"
                type="button"
                className=" flex justify-center w-full item-center py-[27px] "
                onClick={(e) => {
                  handleCreditClick();
                  e.preventDefault();
                  creditCardConfigure();
                  omiseCardHandler();
                  setCredit("#ff7037");
                }}
              >
                <p className="ml-2 text-gray-500 ">Credit Card</p>
              </button>
              <div className=" absolute top-[27px] start-[120px]">
                {" "}
                <CreditCardIcon color={credit} />
              </div>
            </form>
          </div>

          <button
            className={`py-[27px] px-[124px] rounded-[999px] shadow border flex w-[49%] justify-center hover:border-orange-500 
            ${
              paymentMethod === "Cash"
                ? "border-orange-500 text-orange-500"
                : ""
            }`}
            onClick={() => {
              handleCashClick();
              setWallet("#ff7037");
            }}
          >
            <WalletIcon color={wallet} />
            <p className="ml-2 text-gray-500">Cash</p>
          </button>
        </div>
        {paymentMethod === "Cash" && <Cash />}
      </div>
    </>
  );
}

function Cash() {
  return (
    <div className=" bg-gray-100 p-10 flex flex-col items-center">
      <Vector />
      <p className=" text-center mt-6">
        If you want to pay by cash,
        <br />
        you are required to make a cash payment <br />
        upon arrival at the pet sitter'slocation.
      </p>
    </div>
  );
}

export default Booking3;
