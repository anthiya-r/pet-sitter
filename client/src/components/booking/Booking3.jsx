import { CreditCardIcon, WalletIcon } from "../systemdesign/Icons";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { Vector } from "../systemdesign/image";
import { useState } from "react";

function Booking3({ setDisableButtonBooking3 }) {
  const [selectedOption, setSelectedOption] = useState("credit");

  const [credit, setCredit] = useState("#ff7037");
  const [wallet, setWallet] = useState(null);

  const handleCreditClick = () => {
    setSelectedOption("credit"); // เมื่อคลิก Credit Card Icon ให้แสดงหน้า Credit
    setWallet(null);
  };
  const handleCashClick = () => {
    setSelectedOption("cash"); // เมื่อคลิก Wallet Icon ให้แสดงหน้า Cash
    setCredit(null);
  };

  return (
    <>
      <div className="bg-etc-white h-fit p-10">
        <div className="flex justify-between w-full mb-12">
          <button
            className={`py-[27px] px-[124px] rounded-[999px] shadow border flex w-[49%] justify-center hover:border-orange-500 
          
            ${
              selectedOption === "credit"
                ? "border-orange-500 text-orange-500"
                : ""
            }`}
            onClick={() => {
              handleCreditClick();
              setCredit("#ff7037");
            }}
          >
            <CreditCardIcon color={credit} />
            <p className="ml-2">Credit Card</p>
          </button>
          <button
            className={`py-[27px] px-[124px] rounded-[999px] shadow border flex w-[49%] justify-center hover:border-orange-500 
            ${
              selectedOption === "cash"
                ? "border-orange-500 text-orange-500"
                : ""
            }`}
            onClick={() => {
              handleCashClick();
              setWallet("#ff7037");
              setDisableButtonBooking3(false);
            }}
          >
            <WalletIcon color={wallet} />
            <p className="ml-2">Cash</p>
          </button>
        </div>
        {selectedOption === "credit" ? (
          <Credit setDisableButtonBooking3={setDisableButtonBooking3} />
        ) : (
          <Cash />
        )}
      </div>
    </>
  );
}

function Credit({ setDisableButtonBooking3 }) {
  const validationSchema = yup.object({
    cardOwner: yup
      .string("Enter your name")
      .min(5, "Full name should be of minimum 5 characters length")
      .matches(/^[A-Za-z]+$/, "Name should contain only letters")
      .required("Name is required"),
    cardNumber: yup
      .string("Enter your card number")
      .test("is-number", "Enter a valid card number", (value) => {
        return /^\d+$/.test(value);
      })
      .test(
        "is-sixteen-digits",
        "Card number must be sixteen digits",
        (value) => {
          return value.length === 16;
        }
      )
      .required("Card number is required"),
    CVC: yup
      .string("Enter your CVC/CVV")
      .test("is-number", "Enter a valid CVC/CVV number", (value) => {
        return /^\d+$/.test(value);
      })
      .test(
        "is-three-digits",
        "CVC/CVV number must be three digits",
        (value) => {
          return value.length === 3;
        }
      )
      .required("CVC/CVV is required"),
    expiryDate: yup
      .string("Enter your expiry date")
      .required("Expiry date is required")
      .matches(
        /^[0-9]{2}\/[0-9]{2}$/,
        "Expiry date must be in the format MM/YY"
      ),
  });

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardOwner: "",
      expiryDate: "",
      CVC: "",
    },
    validationSchema: validationSchema,
  });

  const isCardNumber = formik.touched.cardNumber && !formik.errors.cardNumber;
  const isCardOwner = formik.touched.cardOwner && !formik.errors.cardOwner;
  const isExpiryDate = formik.touched.expiryDate && !formik.errors.expiryDate;
  const isCVC = formik.touched.CVC && !formik.errors.CVC;

  setDisableButtonBooking3(
    !formik.isValid || !isCardNumber || !isCardOwner || !isCVC || !isExpiryDate
  );

  return (
    <div>
      <div className=" flex  justify-between flex-wrap gap-10 w-full">
        <div className="flex w-full">
          <div className=" flex flex-col w-full mr-10">
            <label htmlFor="cardNumber">Card Number*</label>
            <TextField
              id="cardNumber"
              name="cardNumber"
              // label="Card Number"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
              }
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              placeholder="xxxx-xxxx-xxxx-xxxx"
              required
              className="w-[100%]"
              color="warning"
              InputProps={{ sx: { borderRadius: " 8px" } }}
            />
          </div>
          <div className=" flex flex-col w-full">
            <label htmlFor="cardOwner">Card Owner*</label>
            <TextField
              id="cardOwner"
              name="cardOwner"
              // label="Card Owner"
              value={formik.values.cardOwner}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.cardOwner && Boolean(formik.errors.cardOwner)
              }
              helperText={formik.touched.cardOwner && formik.errors.cardOwner}
              placeholder="Card owner name"
              required
              className="w-[100%]"
              color="warning"
              InputProps={{ sx: { borderRadius: " 8px" } }}
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className=" flex flex-col w-full mr-10">
            <label htmlFor="expiryDate">Expiry Date*</label>
            <TextField
              id="expiryDate"
              name="expiryDate"
              // label="Expiry Date"
              value={formik.values.expiryDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
              }
              helperText={formik.touched.expiryDate && formik.errors.expiryDate}
              placeholder="xx/xx"
              required
              className="w-[100%]"
              color="warning"
              InputProps={{ sx: { borderRadius: " 8px" } }}
            />
          </div>
          <div className=" flex flex-col w-full ">
            <label htmlFor="CVC">CVC/CVV*</label>
            <TextField
              id="CVC"
              name="CVC"
              // label="CVC/CVV"
              value={formik.values.CVC}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.CVC && Boolean(formik.errors.CVC)}
              helperText={formik.touched.CVC && formik.errors.CVC}
              placeholder="xxx"
              required
              className="w-[100%]"
              color="warning"
              InputProps={{ sx: { borderRadius: " 8px" } }}
            />
          </div>
        </div>
      </div>
    </div>
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
