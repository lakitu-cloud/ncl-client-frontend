import React from "react";
import Header from "../../layout/navbar/Header";
import { useApp } from "../../context/ContextProvider";
import CardMeter from "../../components/card/CardMeter";
import { ManagerList } from "./ManagerList";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { AddSalesManager } from "../../components/modal/addSalesManager";

const Sales = () => {
  const { isButtonPress, setIsButtonPress } = useApp();

  const openAddModal = () => setIsButtonPress(true);
  const closeAddModal = () => setIsButtonPress(false);

  return (
    <>
      <Header title="SALES MANAGER MANAGEMENT" />

      <section className="px-4 md:px-8 mt-6">
        {/* Header + Add Button */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <h1 className="text-xl uppercase md:text-4xl font-oswald font-bold text-gray-600">
            Sales Manager
          </h1>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-all font-medium"
          >
            {isButtonPress ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <FiPlus className="w-5 h-5" />
                <span>ADD</span>
              </>
            )}
          </button>

          <IoHelpCircleOutline className="text-gray-500 w-8 h-8" />
        </div>

        <CardMeter />

        <section className="mt-8">
          <ManagerList />
        </section>

        {/* Modal — only renders when open */}
        <AddSalesManager isOpen={isButtonPress} onClose={closeAddModal} />
      </section>
    </>
  );
};

export default Sales;