import React, { useEffect, useRef, useState } from 'react'
// import { useAddSubs } from '../../hook/useSubscriber';
import { useApp } from '../../context/ContextProvider';
import { useAddSubs } from '../../hooks/useSubscriber';
import { Props } from '../../types/subscriberTypes';
import { useDebounce } from '../../hooks/useDebounce';
import { useAvailableMeters } from '../../hooks/useMeter';
import { FiSearch, FiX } from 'react-icons/fi';


const SubscriberForm: React.FC<Props> = ({ IsAddModalOpen, setIsAddModalOpen }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    type: "",
    card: "",
    serial: "",
    phone: "",
    amount: 0,
    location: ""
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const debouncedSerial = useDebounce(formData.serial, 300);
  const isTokenType = formData.type === "Token";

  const { data: suggestions = [], isFetching } = useAvailableMeters(
    debouncedSerial,
    isTokenType
  );

  const createSubscriber = useAddSubs();

  useEffect(() => {
    if (!IsAddModalOpen) {
      setFormData({ fname: "", lname: "", phone: "", amount: 0, location: "", card: "", serial: "", type: "" })
    }
  }, [IsAddModalOpen])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSerialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, serial: value }));
    setShowSuggestions(true);
  };

  const selectSerial = (serial: string) => {
    setFormData(prev => ({ ...prev, serial }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = `${formData.fname.trim()} ${formData.lname.trim()}`.trim();

    createSubscriber.mutate({ 
      amount: Number(formData.amount), 
      name: fullName, 
      card: formData.card, 
      phone: formData.phone, 
      type: formData.type,
      location: formData.location,
      serial: formData.serial
    }, { onSuccess: () => {setIsAddModalOpen(false)}})


  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full font-poppins">
      <div className="flex-1 p-8 space-y-10">

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <input
              required
              placeholder="First Name"
              value={formData.fname}
              onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
              className="px-4 py-2 rounded-lg border-2 border-blue-800 focus:border-blue-600 text-md dark:bg-darkTheme dark:border-gray-200 dark:focus:bg-white" />

            <input
              required
              placeholder="Last Name"
              value={formData.lname}
              onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 text-md dark:bg-darkTheme dark:border-gray-200 dark:focus:bg-white" />

            <input
              required
              type="tel"
              placeholder="Phone Number (e.g. 0755481860)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 text-md dark:bg-darkTheme dark:border-gray-200 dark:focus:bg-white" />

            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="px-4 py-2 rounded-md border-2 dark:bg-darkTheme dark:border-gray-200 dark:focus:bg-white">
              <option defaultValue={'select'}>Select</option>
              <option>Token</option>
              <option>Card</option>
            </select>
          </div>

          <div className="grid grid-cols-1 w-full">
            <input
              required
              type='text'
              placeholder="Description"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="px-4 py-6 rounded-md border-2 dark:bg-darkTheme dark:border-gray-200 dark:focus:bg-white" />
          </div>

          {/* Token Type: Meter Serial with Autocomplete */}
          {isTokenType && (
            <div className="relative">
              <div className="relative">
                <input
                  ref={inputRef}
                  required
                  type="text"
                  placeholder="Meter Serial Number"
                  value={formData.serial}
                  onChange={handleSerialChange}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full px-4 py-6 rounded-lg border-2 border-gray-200 focus:border-blue-600 text-md dark:bg-darkTheme dark:border-gray-200 dark:focus:bg-white"
                />
                {isFetching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                  </div>
                )}
                {formData.serial && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, serial: "" }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={20} />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                >
                  {suggestions.map((meter) => (
                    <button
                      key={meter.id}
                      type="button"
                      onClick={() => selectSerial(meter.serial)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center gap-3"
                    >
                      <FiSearch className="text-gray-400" />
                      <span className="font-mono">{meter.serial}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {formData.type === "Card" && (
            <div className='grid md:grid-cols-2 gap-8'>
              <input
                required
                placeholder="Card Number"
                value={formData.card}
                onChange={(e) => setFormData({ ...formData, card: e.target.value })}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 text-md" />

              <div>
                <input
                  required
                  type="number"
                  placeholder='Initial card amount'
                  min="0"
                  step="100"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: +e.target.value })}
                  className="flex-1 px-4 py-2 text-md font-bold rounded-md border-2 border-gray-300 focus:border-blue-600" />
                <span className="text-md font-bold text-gray-600">TZS</span>
              </div>

            </div>
          )}



        </div>
      </div>

      {/* Footer - fixed at bottom */}
      <div className="p-8  flex justify-between border-t border-gray-200">

        <button
          type="submit"
          disabled={createSubscriber.isPending}
          className="px-12 py-4 bg-blueTheme text-white font-bold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-3 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-200 dark:hover:text-gray-800"
        >
          {createSubscriber.isPending ? "Creating..." : "Create Customers"}
        </button>

      </div>
    </form>
  )
}

export default SubscriberForm