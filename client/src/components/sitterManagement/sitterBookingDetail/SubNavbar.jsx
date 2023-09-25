import React, { useState } from "react";
import { ArrowLeftIcon, Dot } from "../../systemdesign/Icons";
import { ButtonPrimary, ButtonSecondary } from "../../systemdesign/Button";
import axios from "axios";

function SubNavbar({
  sitterId,
  bookingId,
  userFullName,
  status,
  booking,
  setBooking,
}) {
  const updateStatus = async (statuses) => {
    try {
      const response = await axios.put(
        `/sitterManagement/${sitterId}/booking/${bookingId}`,
        {
          statuses: statuses,
        }
      );
      setBooking({ ...booking, statuses: statuses });
    } catch (err) {
      console.error("Error updating booking status from client", err);
    }
  };

  const updateSuccessStatus = async () => {
    try {
      const response = await axios.put(
        `/sitterManagement/${sitterId}/booking/${bookingId}/success`,
        {
          statuses: "Success",
        }
      );

      if (response.status === 201) {
        console.log("Booking status updated to Success successfully.");
      }
    } catch (err) {
      console.error(
        "Error updating booking status to Success from client",
        err
      );
    }
  };

  return (
    <div className="flex w-[1120px] h-[48px] justify-between ">
      <div className="flex justify-center items-center">
        <ArrowLeftIcon color="#7B7E8F" />
        <h3 className="pl-2.5 pr-6">{userFullName}</h3>
        <div className="flex justify-center items-center gap-2">
          <Dot
            color={`${
              status === "In service"
                ? "#76D0FC"
                : status === "Waiting for confirm"
                ? "#FA8AC0"
                : status === "Waiting for service"
                ? "#FFCA62"
                : status === "Success"
                ? "#1CCD83"
                : status === "Canceled"
                ? "#EA1010"
                : ""
            }`}
          />
          <div
            className={` text-body2 ${
              status === "In service"
                ? "text-blue-500"
                : status === "Waiting for confirm"
                ? "text-pink-500"
                : status === "Waiting for service"
                ? "text-yellow-200"
                : status === "Success"
                ? "text-green-500"
                : status === "Canceled"
                ? "text-etc-red"
                : ""
            }`}
          >
            {status}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {status === "Waiting for confirm" && (
          <>
            <ButtonSecondary
              content="Reject Booking"
              width="160px"
              onClick={() => {
                updateStatus("Canceled");
              }}
            />

            <ButtonPrimary
              content="Confirm Booking"
              width="175px"
              onClick={() => {
                updateStatus("Waiting for service");
              }}
            />
          </>
        )}
        {status === "Waiting for service" && (
          <ButtonPrimary
            content="In service"
            onClick={() => updateStatus("In service")}
          />
        )}
        {status === "In service" && (
          <ButtonPrimary content="Success" onClick={updateSuccessStatus} />
        )}
        {status === "Success" && <ButtonPrimary content="Review" />}
      </div>
    </div>
  );
}

export default SubNavbar;
