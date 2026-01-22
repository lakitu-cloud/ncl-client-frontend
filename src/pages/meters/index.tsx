import Header from "../../layout/navbar/Header";
import { useApp } from "../../context/ContextProvider";
import { useMeterStats } from "../../hooks/useMeter";
import { MeterListCards } from "../../components/card/meterListCards";
import React, { Suspense } from "react";

const ZoneMeters = React.lazy(() => import("./ZoneMeters"))
const SaleMeters = React.lazy(() => import("./SaleMeters"))


const Meters = () => {
  const { accountType } = useApp();

  return (
    <main>
      <Header title="Meter Management" />

      <section className="px-8 mt-4">

        <section className="mt-2">
          {accountType === "zone" && (
            <Suspense fallback={<div>Loading meters...</div>}>
              <ZoneMeters />
            </Suspense>)}
          {accountType === "sales" && (
            <Suspense fallback={<div>Loading meters...</div>}>
              <SaleMeters />
            </Suspense>
          )}
        </section>
        {/* {isButtonPress && <AddMeterModal />} */}
      </section>
    </main>
  );
};

export default Meters;
