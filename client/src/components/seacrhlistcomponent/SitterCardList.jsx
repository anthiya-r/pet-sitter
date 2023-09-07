import React from "react";
import { StarIcon, MapMakerIcon } from "../systemdesign/Icons.jsx";
import {
  DogType,
  CatType,
  BirdType,
  RabbitType,
} from "../systemdesign/PetType.jsx";
import { Link } from "react-router-dom";

function SitterCardList({ items }) {
  return (
    <div className="w-[848px] h-[216px] flex flex-col gap-4">
      {items.map((card, index) => {
        return (
          <Link to="/sitter" key={index}>
            <div
              className="flex p-4 gap-10 bg-etc-white rounded-[16px] hover:border-[#FF7037]
              hover:border-solid hover:border-[1px]"
            >
              <img
                src={card.place}
                alt={card.trade_name}
                className="object-cover w-[245px] h-[184px] rounded-[8px]"
              />
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div>
                    <img
                      src={card.avatar}
                      alt={card.trade_name}
                      className="object-cover w-[64px] h-[64px] rounded-full"
                    />
                  </div>
                  <div className="w-[315px] ">
                    <span className="text-[24px] font-bold text-[#000]">
                      {card.trade_name}
                      <br />
                    </span>
                    <span className="text-[18px] font-medium text-[#000]">
                      By {card.siiter_name}
                    </span>
                  </div>
                  <div className="flex w-[120px] h-[32px] p-[6px] gap-[2px] justify-end">
                    {Array.from({ length: card.rating }).map((_, index) => (
                      <StarIcon key={index} color="#1CCD83" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-[6px]">
                  <div>
                    <MapMakerIcon color="#AEB1C3" />
                  </div>
                  <div className="text-[#7B7E8F] text-[16px] font-medium">
                    {card.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  {card.pets.map((pet, index) => (
                    <span key={index}>
                      {pet === "Dog" && <DogType />}
                      {pet === "Cat" && <CatType />}
                      {pet === "Bird" && <BirdType />}
                      {pet === "Rabbit" && <RabbitType />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SitterCardList;