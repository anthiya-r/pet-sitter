import { ArrowLeftIcon, Dot } from "../../systemdesign/Icons";
import { ButtonPrimary, ButtonSecondary } from "../../systemdesign/Button";
import RejectModal from "./RejectModal";
import ReviewModal from "./ReviewModal";
import YourReview from "./YourReview";
import { useEffect } from "react";

function SubNavbar(props) {

  useEffect (()=> {
    console.log("props",props);
  })

  return (
    <div className="flex w-[1120px] h-[48px] justify-between ">
      <div className="flex justify-center items-center">
        <ArrowLeftIcon color="#7B7E8F" />
        <h3 className="pl-2.5 pr-6">{props.userFullName}</h3>
        <div className="flex justify-center items-center gap-2">
          <Dot
            color={`${
              props.status === "In service"
                ? "#76D0FC"
                : props.status === "Waiting for confirm"
                ? "#FA8AC0"
                : props.status === "Waiting for service"
                ? "#FFCA62"
                : props.status === "Success"
                ? "#1CCD83"
                : props.status === "Canceled"
                ? "#EA1010"
                : ""
            }`}
          />
          <div
            className={` text-body2 ${
              props.status === "In service"
                ? "text-blue-500"
                : props.status === "Waiting for confirm"
                ? "text-pink-500"
                : props.status === "Waiting for service"
                ? "text-yellow-200"
                : props.status === "Success"
                ? "text-green-500"
                : props.status === "Canceled"
                ? "text-etc-red"
                : ""
            }`}
          >
            {props.status}
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {props.status === "Waiting for confirm" && (
          <ButtonSecondary
            className="btn"
            content="Reject Booking"
            width="160px"
            onClick={() => document.getElementById(`reject`).showModal()}
          />
        )}
        <RejectModal />
        {props.status === "Waiting for service" && (
          <ButtonPrimary content="In service" />
        )}
        {props.status === "In service" && <ButtonPrimary content="Success" />}

        {/* {props.status === "Success" && (
          <ButtonPrimary
            className="btn"
            content="Review"
            onClick={() => document.getElementById(`review`).showModal()}
          />
        )}

        <ReviewModal />
        {props.status === "Success" && (
          <ButtonSecondary
            className="btn"
            onClick={(e) => {
              document.getElementById("yourreview").showModal();
            }}
            content="Your Review"
          />
        )} */}
        <YourReview />
        {props.review_id !== null ? (
          <>
            {/* {props.status === "Success" && (
              <ButtonPrimary
                className="btn"
                content="Review"
                onClick={() => document.getElementById(`review`).showModal()}
              />
            )} */}

            {/* <ReviewModal /> */}
            {props.status === "Success" && (
              <ButtonSecondary
                className="btn"
                onClick={(e) => {
                  document.getElementById("yourreview").showModal();
                }}
                content="Your Review"
              />
            )}
          </>
        ) : (
          <>
            {props.status === "Success" && (
              <ButtonPrimary
                className="btn"
                content="Review"
                onClick={() => document.getElementById(`review`).showModal()}
              />
            )}

            <ReviewModal />
          </>
        )}
      </div>
    </div>
  );
}

export default SubNavbar;
