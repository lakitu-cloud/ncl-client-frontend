import React from "react";

import SubscriberForm from "../form/subscriberForm";
import { HiX } from "react-icons/hi";
import { IoBusiness, IoCloseOutline, IoPeopleOutline } from "react-icons/io5";
import { Props } from "../../types/wakalaType";
import WakalaForm from "../form/wakalaForm";


const AddWakalaModal: React.FC<Props> = ({ setIsAddModalOpen, IsAddModalOpen }) => {

  return (
    <section>
      <div className="fixed inset-0 font-poppins bg-black/60 backdrop-blur-md z-40" onClick={() => setIsAddModalOpen(!IsAddModalOpen)} />

      <div className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-darkTheme rounded-md shadow-md w-full max-w-6xl max-h-[95vh] flex flex-col">
          {/* Full scrollable area including header */}
          <div className="flex-1 overflow-y-auto">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-white dark:bg-darkTheme z-10 border-b border-gray-200 dark:border-gray-600 p-4">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blueTheme  dark:bg-white rounded-md">
                    <IoPeopleOutline className="w-8 h-8 text-white dark:text-blueTheme" />
                  </div>
                  <div>
                    <h2 className="text-lg text-gray-800 font-bold  dark:text-gray-200 font-oswald">Create Wakala </h2>
                    <p className="text-gray-400 dark:text-gray-200 text-sm font-poppins">Fill wakala's details and assign prepaid pos</p>
                  </div>
                </div>
                <button onClick={() => setIsAddModalOpen(!IsAddModalOpen)} className="p-3 hover:bg-white/20 rounded-xl transition">
                  <IoCloseOutline className="w-6 h-6" />
                </button>
              </div>
            </div>
            <WakalaForm setIsAddModalOpen={setIsAddModalOpen} IsAddModalOpen={IsAddModalOpen}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddWakalaModal;
