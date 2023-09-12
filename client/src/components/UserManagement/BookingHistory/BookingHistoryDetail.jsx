import React from "react";

function BookingHistoryDetail({ card }) {
  return (
    <dialog id="booking-detail" className="modal">
      <div key={card.id} className="modal-box bg-etc-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-etc-white">
            ✕
          </button>
        </form>
        <h3 className=" text-gray-600 text-2xl pt-0 pb-6 font-bold">
          Booking Detail
        </h3>
        <hr className=" w-full" />
        <div className="booking-detail-wraaper flex flex-col gap-6">
          <h5 className="font-Satoshi text-base font-medium leading-6 pt-6">
            <ul>
              <li
                className={`list-disc gap-2 ${
                  card.status === "In service" ? "text-blue-500" : ""
                } ${
                  card.status === "Waiting for confirmation"
                    ? "text-pink-500"
                    : card.status === "Waiting for service"
                    ? "text-yellow-200"
                    : card.status === "Success"
                    ? "text-green-500"
                    : card.status === "Canceled"
                    ? "text-etc-red"
                    : ""
                }`}
              >
                {card.status}
              </li>
            </ul>
          </h5>
          <div className=" text-gray-300 text-body2 ">
            <p>Transaction date: {card.transaction_date}</p>
            <p>Transaction No.: {card.transaction_number}</p>
          </div>
          <div className="">
            <h5 className=" text-body3 text-gray-400">Pet Sitter: </h5>
            <h4 className=" text-body2 text-gray-600 font-bold">
              {card.trade_name}
            </h4>
          </div>
          <main className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className=" flex flex-col gap-1">
                <div className=" text-body3 text-gray-400">Date & Time:</div>{" "}
                <div className=" text-body3 text-gray-600">
                  {card.date} | {card.starttime} - {card.endtime}
                </div>
              </div>
              <div className="flex flex-col  w-[50%]">
                <div className=" text-body3 text-gray-400">Duration:</div>{" "}
                <div className=" text-body2 text-gray-600 ">
                  {card.duration} hours
                </div>
              </div>
            </div>

            <div className="flex flex-col ">
              <div className=" text-body3 text-gray-400">Pet:</div>
              <div className=" text-body2 text-gray-600">{card.pet_name}</div>
            </div>
          </main>
          <hr />
          <div className="flex justify-between">
            <h1 className="text-body2">Total: </h1>
            <p className="text-body1"> {card.total} THB</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default BookingHistoryDetail;
