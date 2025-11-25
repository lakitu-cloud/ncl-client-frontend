import React, { useState } from 'react'
// import { useAddSubs } from '../../hook/useSubscriber';
import { useApp } from '../../context/ContextProvider'; 

const SubscriberForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<"token" | "card" | "">("");
  const [ ppu, setPpu ] = useState<number>(0);
  const [region, setRegion] = useState("");
  const [ward, setWard] = useState("");
  const [card, setCard] = useState<string>("");
  const [ amount, setAmount ] = useState<number>();
  const { setIsButtonPress } = useApp();
  // const { mutate: createMutate, error, isError, isPending } = useAddSubs()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
        // createMutate({ name, phone, type, region, ward, card, ppu })
      
    } catch (error) {
      console.error("Error registering subscriber:", error);
      // setIsError("Failed to register subscriber. Please try again.");
      // alert("Failed to register subscriber. Please try again.");
    } finally {
      setIsButtonPress(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto space-y-3 text-center font-oswald"
    >
      <h3 className="text-lg font-medium text-gray-800">
        Register a New Subscriber
      </h3>
      <div className="text-sm text-gray-600 font-poppins">
        {/* {isError ? (
          <p className="text-red-500">{error.message}</p>
        ) : (
          <p>Please fill in the details below to register a new subscriber.</p>
        )} */}
      </div>
      <fieldset className="relative">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </fieldset>
      <fieldset className="relative">
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full px-3 py-2 border rounded"
          required
        />
      </fieldset>
      <div className="flex items-center space-x-4">
        <fieldset className="relative w-1/2">
          <input
            type="text"
            name="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Region"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </fieldset>

        <fieldset className="relative w-1/2">
          <input
            type="text"
            name="ward"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            placeholder="Ward"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </fieldset>
      </div>
      <select
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value as "token" | "card" | "")}
        className="w-full px-3 py-2 border rounded"
        required
      >
        <option value="">Select Type</option>
        <option value="token">token</option>
        <option value="card">Card</option>
      </select>

      {type === "card" && (
        <>
        <fieldset className="relative">
          <input
            type="text"
            name="card"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            placeholder="Card Number"
            className="w-full px-3 py-2 border rounded"
            required={type === "card"}
          />
        </fieldset>

        <fieldset className="relative">
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
          className="w-full px-3 py-2 border rounded"
          required={type === "card"}
        />
      </fieldset>
      </>
      )}

      {type === "token" && (
        <fieldset className="relative">
            <input
              type="number"
              name="ppu"
              id="ppu"
              value={ppu}
                onChange={(e) => setPpu(Number(e.target.value))}
                placeholder="Price per Unit"
                className="w-full px-3 py-2 border rounded"
                required
            />
        </fieldset>
        )}

      <div className="space-y-2">
        {/* <button
          type="submit"
          className="w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Subscriber"}
        </button> */}
      </div>
    </form>
  )
}

export default SubscriberForm