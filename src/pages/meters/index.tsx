import React, { useEffect, useState } from "react";
import MetersPage from "./ZoneMeters";
import Header from "../../layout/navbar/Header";
import { useApp } from "../../context/ContextProvider";
import AddMeterModal from "../../components/modal/addSubscriberModal";
import CardMeter from "../../components/card/CardMeter";
import { useAuth } from "../../context/AuthProvider";
import { SaleMeters } from "./SaleMeters";

const Meters = () => {
  const { token } = useAuth();
  const { accountType, setAccountType } = useApp();
  const [ role, setRole ] = useState('')


  return (
    <>
      <Header title="Meter Management" />

      <section className="px-8 mt-4">
        {/* <div className="flex flex-wrap items-center space-x-2 space-y-2 mb-2">
          <p className="text-4xl font-oswald">Meters</p>

          <div
            onClick={() => {
              console.log("button pressed");
              setIsButtonPress(true);
            }}
            className="flex items-center space-x-2 bg-blue-800 text-white px-2 py-2 rounded-lg"
          >
            {!isButtonPress ? (
              <>
                <FiPlus />
                <span className="font-poppins font-md">ADD</span>
              </>
            ) : (
              <>
                <div className="spinner-border h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span className="font-poppins font-md">ADDING...</span>
              </>
            )}
          </div>
          <IoHelpCircleOutline className="inline-block ml-2 text-gray-600 w-5 h-5 md:w-6 md:h-6 -mt-1 md:-mt-2" />
        </div> */}
        <CardMeter />
        <section className="mt-2">
          {accountType === "zone" && (<MetersPage />)}
          {accountType === "sales" && (<SaleMeters />)}
        </section>
        {/* {isButtonPress && <AddMeterModal />} */}
      </section>
    </>
  );
};

export default Meters;
