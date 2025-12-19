import React from "react";
import Header from "../../layout/navbar/Header";
import { useApp } from "../../context/ContextProvider";
import AddSubscriberModal from "../../components/modal/addSubscriberModal";
import CardSubscriber from "../../components/card/subscriberCards";
import { SubscriberTable } from "./List";

const Subscribers: React.FC = () => {
  const { isButtonPress } = useApp();

  return (
    <main>
      <Header title="Subscribers Management" />
      
      <section className="px-8 mt-8">
        <CardSubscriber />
      </section>

      <section className="px-8 mt-8">
        <SubscriberTable />
      </section>

      {/* {isButtonPress && <AddSubscriberModal />} */}
    </main>
  );
};

export default Subscribers;
