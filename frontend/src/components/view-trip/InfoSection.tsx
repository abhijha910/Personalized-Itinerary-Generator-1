"use client";

import { Itinerary } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TravelImage from "@/public/travel.jpg";
import { Button } from "../ui/button";
import { IoIosSend } from "react-icons/io";
import { PHOTO_REF_URL, PlaceDetails } from "@/src/service/GlobalAPI";

const InfoSection = ({ itinerary }: { itinerary: Itinerary }) => {
  const [photo, setPhoto] = useState("");

  const getPlacePhoto = async () => {
    const data = {
      textQuery: itinerary?.location,
    };

    const response = await PlaceDetails(data).then((res) => {
      // console.log("This is places data: ",res.data.places[0].photos[3].name);

      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name
      );
      setPhoto(photoUrl);
    });
  };

  useEffect(() => {
    itinerary && getPlacePhoto();
  }, [itinerary]);

  return (
    <div className="flex flex-col justify-center items-start ">
      <Image
        src={photo ? photo : TravelImage}
        alt="Travel"
        height={100}
        width={1200}
        quality={100}
        layout="fixed"
        className=" h-[150px] md:h-[340px] object-cover rounded-xl shadow-md"
      />
      <div className="flex justify-between w-full">
        <div className="my-5 gap-2">
          <h2 className="font-bold text-2xl pb-2">{itinerary?.location}</h2>
          <div className="flex gap-x-4">
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-xs md:text-md text-gray-500">
              📅{itinerary?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-xs md:text-md text-gray-500">
              🪙 Budget: {itinerary?.budget}
            </h2>
            <h2 className="p-1 px-3 bg-gray-100 rounded-full text-xs md:text-md text-gray-500">
              🧑🏼‍🤝‍🧑🏼 No. of Travelers {itinerary?.traveler}
            </h2>
          </div>
        </div>
        <div className="pt-14 pl-2 md:pl-0">
          <Button>
            <IoIosSend className="h-7 w-7 p-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;