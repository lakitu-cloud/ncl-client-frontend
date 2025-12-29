import React from "react";
import Header from "../../layout/navbar/Header";
import { SubscriberTable } from "./subscriberList";
import { SubscriberListCards } from "../../components/card/subscriberListCards";
import { useSubscriberStats } from "../../hooks/useSubscriber";

const Subscribers: React.FC = () => {
  const { stats, isLoading: loadingStats } = useSubscriberStats();
  return (
    <main>
      <Header title="Subscribers Management" />

      <section className="px-8 mt-8">
        <SubscriberListCards stats={stats} isLoading={loadingStats}/>
        <section className="mt-2">
          <SubscriberTable />
        </section>
      </section>

    </main>
  );
};

export default Subscribers;
