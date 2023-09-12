import Avatar from "@mui/material/Avatar";
import Line from "../../../assets/img/Line.png";
import BookingHistoryDetail from "./BookingHistoryDetail";
import { useContext } from "react";
import { BookingStatusContext } from "../../../contexts/BookingStatusContext";

export const petData = [
  {
    id: 1,
    trade_name: "Kid friendly",
    pet_sitter_name: "Jane",
    transaction_date: "8/16/2023",
    status: "Test2",
    date: "3/11/2022",
    starttime: "12 PM",
    endtime: "13 PM",
    duration: 1,
    pet_name: "I som",
    status_message: "Pet in care",
    transaction_number: 122315,
    imageSrc: "http://dummyimage.com/64x64.png/cc0000/ffffff",
    total: 600,
  },
  {
    id: 2,
    trade_name: "We love cat and your cat",
    pet_sitter_name: "Maison",
    transaction_date: "8/16/2023",
    status: "Waiting for service",
    date: "2/3/2023",
    starttime: "12 PM",
    endtime: "13 PM",
    duration: 2,
    pet_name: "Daisy",
    status_message: "Pet in care",
    transaction_number: 122313,
    imageSrc: "http://dummyimage.com/64x64.png/dddddd/000000",
    total: 600,
  },
  {
    id: 3,
    trade_name: "Kid friendly",
    pet_sitter_name: "Maison",
    transaction_date: "8/16/2023",
    status: "In service",
    date: "11/6/2023",
    starttime: "12 PM",
    endtime: "13 PM",
    duration: 3,
    pet_name: "Bubba",
    status_message: "Waiting for confirmation",
    transaction_number: 122312,
    imageSrc: "http://dummyimage.com/64x64.png/cc0000/ffffff",
    total: 600,
  },
  {
    id: 4,
    trade_name: "Kid friendly",
    pet_sitter_name: "Maison",
    transaction_date: "8/16/2023",
    status: "Success",
    date: "28/2/2022",
    starttime: "12 PM",
    endtime: "13 PM",
    duration: 4,
    pet_name: "Noodle Birb",
    status_message: "Waiting for confirmation",
    transaction_number: 122316,
    imageSrc: "http://dummyimage.com/64x64.png/ff4444/ffffff",
    total: 600,
  },
];

function BookingHistory() {
  const { status, setStatus } = useContext(BookingStatusContext);
  console.log("data", status);
  const data = status;

  // เอาไว้ใช้ตอนที่ owner / sitter กด button เพื่อเปลี่ยน status
  const handleClick = (id) => {
    const updateStatus = data.map((card) => {
      return card.id === id ? { ...card, status: "Test" } : card;
    });
    setStatus(updateStatus);
  };

  return (
    <section className="booking-history flex flex-col gap-6">
      {Array.isArray(data) !== undefined &&
        data.map((card) => {
          return (
            <div
              className="booking-history-container border border-gray-200 rounded-2xl p-6"
              key={card.id}
              onClick={() =>
                document.getElementById("booking-detail").showModal()
              }
            >
              <BookingHistoryDetail />
              <header className="booking-history-header flex justify-between border border-etc-white border-b-gray-200 pb-4">
                <div className="flex gap-2 items-center">
                  <Avatar alt="avatar" src={card.imageSrc} className="border" />
                  <div>
                    <h1 className=" text-headline3">{card.trade_name}</h1>
                    <h3 className=" text-body1">By {card.pet_sitter_name}</h3>
                  </div>
                </div>
                <div>
                  <p className=" text-body3 text-gray-300 text-right">
                    Transaction date: {card.transaction_date}
                  </p>
                  <h5
                    className=" text-right text-body2"
                    onClick={() => handleClick(card.id)}
                  >
                    {card.status}
                  </h5>
                </div>
              </header>
              <main className="pt-4 flex gap-x-7 items-center">
                <div className="text-gray-400 w-1/3 flex flex-col gap-2">
                  <div className=" text-body3">Date & Time:</div>{" "}
                  <div className="text-gray-600 text-body3 ">
                    {card.date} | {card.starttime} - {card.endtime}
                  </div>
                </div>
                <img src={Line} alt="line" className="h-9" />
                <div className="text-gray-400 w-1/3 flex flex-col gap-2">
                  <div className=" text-body3">Duration:</div>{" "}
                  <div className="text-gray-600">{card.duration} hours</div>
                </div>
                <img src={Line} alt="line" className="h-9" />
                <div className="text-gray-400 w-1/3 flex flex-col gap-2">
                  <div className=" text-body3">Pet:</div>
                  <div className="text-gray-600">{card.pet_name}</div>
                </div>
              </main>
              <div className="text-gray-400 flex-1 w-auto bg-gray-100 p-4 mt-9 rounded-lg">
                {card.status_message}
              </div>
            </div>
          );
        })}
    </section>
  );
}

export default BookingHistory;