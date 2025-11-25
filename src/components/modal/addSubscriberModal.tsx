import React from "react";

import SubscriberForm from "../form/subscriberForm";
import { HiX } from "react-icons/hi";
import { useApp } from "../../context/ContextProvider";

const AddSubscriberModal: React.FC = () => {
  const { setIsButtonPress } = useApp()
  
  return (
    <section>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <div className="fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
          <div className="bg-white rounded-md shadow-lg px-4 py-6">
            <div className="flex items-center justify-end">
              <button
                onClick={() => setIsButtonPress((prevState) => !prevState)}
                className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>
            <SubscriberForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddSubscriberModal;
