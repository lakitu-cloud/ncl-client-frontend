import React, { useEffect, useRef, useState } from 'react'
// import { useAddSubs } from '../../hook/useSubscriber';
import { useApp } from '../../context/ContextProvider';
import { useAddSubs } from '../../hooks/useSubscriber';
import { Props } from '../../types/subscriberTypes';
import { useDebounce } from '../../hooks/useDebounce';
import { useAvailableMeters } from '../../hooks/useMeter';
import { FiSearch, FiX } from 'react-icons/fi';
import { useCreateWakala } from '../../hooks/useWakala';


const WakalaForm: React.FC<Props> = ({ IsAddModalOpen, setIsAddModalOpen }) => {
  const [formData, setFormData] = useState({ fname: "", lname: "", phone: "", email: "", imei: "", float: 0 });


  const createWakala = useCreateWakala();

  useEffect(() => {
    if (!IsAddModalOpen) {
      setFormData({ fname: "", lname: "", phone: "", email: "", imei: "", float: 0 })
    }
  }, [IsAddModalOpen])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = `${formData.fname.trim()} ${formData.lname.trim()}`.trim();

    createWakala.mutate({
      name: fullName,
      phone: formData.phone,
      email: formData.email,
      imei: formData.imei,
      float: Number(formData.float)
    }, { onSuccess: () => { setIsAddModalOpen(false) } })


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

            <input
              required
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-600 text-md dark:bg-darkTheme dark:border-gray-200 dark:focus:bg-white" />
          </div>

          <div className="grid grid-cols-1 w-full">
            <input
              required
              type='text'
              placeholder="IMEI"
              value={formData.imei}
              onChange={(e) => setFormData({ ...formData, imei: e.target.value })}
              className="px-4 py-6 rounded-md border-2 dark:bg-darkTheme dark:border-gray-200 dark:focus:bg-white" />
          </div>

          <div className='grid grid-cols-1 gap-8'>
            <input
              required
              type="number"
              placeholder='Initial card amount'
              min="0"
              step="100"
              value={formData.float}
              onChange={(e) => setFormData({ ...formData, float: +e.target.value })}
              className="flex-1 px-4 py-2 text-md font-bold rounded-md border-2 border-gray-300 focus:border-blue-600" />
            <span className="text-md font-bold text-gray-600">TZS</span>
          </div>

        </div>


      </div>

      {/* Footer - fixed at bottom */}
      <div className="p-8  flex justify-between border-t border-gray-200">

        <button
          type="submit"
          disabled={createWakala.isPending}
          className="px-12 py-4 bg-blueTheme text-white font-bold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-3 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-200 dark:hover:text-gray-800"
        >
          {createWakala.isPending ? "Creating..." : "Create Manager"}
        </button>

      </div>
    </form>
  )
}

export default WakalaForm