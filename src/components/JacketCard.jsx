import React, { useEffect, useState } from "react";
import jacketService from "../services/jacketService";

const JacketCard = ({ orderNo }) => {
  const [jacket, setJacket] = useState(null);

  useEffect(() => {
    const fetchJacket = async () => {
      try {
        const data = await jacketService.getJacketByOrderNo(orderNo);
        setJacket(data);
      } catch (error) {
        console.error("Failed to fetch jacket measurements:", error);
      }
    };

    fetchJacket();
  }, [orderNo]);

  if (!jacket) {
    return <></>;
  } 

  if (!jacket.collar && !jacket.chest && !jacket.waist && !jacket.jacket_length && !jacket.natural_length && !jacket.back_length && !jacket.x_back && !jacket.half_shoulder && !jacket.to_sleeve && !jacket.other_notes) {
    return <></>;
  }

  return (
    <>
      <div className="bg-slate-700 rounded-lg shadow-lg">
        <div className="text-lg text-gray-400 px-2 pt-2">Jacket Measurements</div>
        <div className="flex flex-col p-2">
          <div className="flex flex-row space-x-2">
            <div className="text-gray-400 font-light" >Jacket Length: </div>
            <div>{jacket.jacket_length}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="text-gray-400 font-light" >Natural Length: </div>
            <div>{jacket.natural_length}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="text-gray-400 font-light" >Back Length: </div>
            <div>{jacket.back_length}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="text-gray-400 font-light" >Cross Back: </div>
            <div>{jacket.x_back}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="text-gray-400 font-light" >Half Shoulder: </div>
            <div>{jacket.half_shoulder}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="text-gray-400 font-light" >To Sleeve: </div>
            <div>{jacket.to_sleeve}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="text-gray-400 font-light" >Chest: </div>
            <div>{jacket.chest}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="text-gray-400 font-light" >Waist: </div>
            <div>{jacket.waist}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <div className="text-gray-400 font-light" >Collar: </div>
            <div>{jacket.collar}</div>
          </div>
        </div>
        <div className="flex flex-row space-x-2 p-2">
          <div className="text-gray-400 font-light" >Other Notes: </div>
          <div>{jacket.other_notes}</div>
        </div>
      </div>
    </>
  );
};

export default JacketCard;
