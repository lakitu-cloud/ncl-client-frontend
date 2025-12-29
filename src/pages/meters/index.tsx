import MetersPage from "./ZoneMeters";
import Header from "../../layout/navbar/Header";
import { useApp } from "../../context/ContextProvider";
import { SaleMeters } from "./SaleMeters";
import { useMeterStats } from "../../hooks/useMeter";
import { MeterListCards } from "../../components/card/meterListCards";

const Meters = () => {
  const { accountType } = useApp();
  const { stats, isLoading: loadingStats } = useMeterStats();

  return (
    <main>
      <Header title="Meter Management" />

      <section className="px-8 mt-4">
     
        <MeterListCards stats={stats} isLoading={loadingStats} />
        <section className="mt-2">
          {accountType === "zone" && (<MetersPage />)}
          {accountType === "sales" && (<SaleMeters />)}
        </section>
        {/* {isButtonPress && <AddMeterModal />} */}
      </section>
    </main>
  );
};

export default Meters;
