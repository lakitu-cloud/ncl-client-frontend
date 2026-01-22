// components/zone/ZoneMeters.tsx
import React, { useState, useMemo } from "react";
import {
  FaChevronDown,
  FaSync,
  FaToggleOff,
  FaToggleOn,
  FaSearch,
  FaDownload,
  FaCog,
  FaExclamationTriangle,
} from "react-icons/fa";
import { FiEye, FiTrash } from "react-icons/fi";
import { TbAdjustmentsCancel } from "react-icons/tb";
import {
  FaCircleCheck,
  FaCircleStop,
  FaCircleXmark,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { MeterListCards } from "../../components/card/meterListCards";
import { useGetAllMeter } from "../../hooks/useMeter";
import { useRefresh } from "../../hooks/useUser";
import DeleteModel from "../../components/modal/deleteModel";
import Setting from "./Setting";
import Jobs from "./Jobs";
import { Meter } from "../../types/meterTypes";

const ZoneMeters = () => {
  const {
    data: meters = [],
    isLoading,
    isError,
    error,
  } = useGetAllMeter();

  const { mutate: refreshMeters, isPending: isRefreshing } = useRefresh();

  const [toggle, setToggle] = useState(true);
  const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<"delete" | "jobs" | "configure" | "">("");

  // Filters
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);

  // Pagination
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const filteredMeters = useMemo(() => {
    let result = toggle ? meters : meters.filter((m) => m.status !== "inactive");

    if (statusFilter) {
      result = result.filter((m) => m.status === statusFilter);
    }

    if (typeFilter) {
      result = result.filter((m) => m.type.toLowerCase() === typeFilter.toLowerCase());
    }

    if (globalFilter) {
      const lower = globalFilter.toLowerCase();
      result = result.filter(
        (m) =>
          m.serial.toLowerCase().includes(lower) ||
          m.description?.toLowerCase().includes(lower) ||
          m.type.toLowerCase().includes(lower) ||
          m.error?.toLowerCase().includes(lower)
      );
    }

    return result;
  }, [meters, toggle, statusFilter, typeFilter, globalFilter]);

  const paginatedMeters = useMemo(() => {
    const start = pageIndex * pageSize;
    return filteredMeters.slice(start, start + pageSize);
  }, [filteredMeters, pageIndex]);

  const totalPages = Math.ceil(filteredMeters.length / pageSize);

  const handleRefresh = () => refreshMeters();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">
        Error loading meters: {error?.message || "Unknown error"}
        <button onClick={handleRefresh} className="ml-4 text-blue-600 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <MeterListCards meters={filteredMeters} isLoading={isLoading} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 mb-4">
        {/* Left Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Status */}
          <div className="relative">
            <button
              onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Status <FaChevronDown className="w-3 h-3" />
            </button>
            {openStatusDropdown && (
              <div className="absolute z-20 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700">
                {["All", "Active", "Inactive", "Locked", "Suspended"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setStatusFilter(opt === "All" ? "" : opt.toLowerCase());
                      setOpenStatusDropdown(false);
                    }}
                    className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Type - can be expanded later */}
          <div className="relative">
            <button
              onClick={() => setOpenTypeDropdown(!openTypeDropdown)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Type <FaChevronDown className="w-3 h-3" />
            </button>
            {/* ... similar dropdown ... */}
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[280px] relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search serial, description, error..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setToggle(!toggle)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title={toggle ? "Hide inactive meters" : "Show all meters"}
          >
            {toggle ? (
              <FaToggleOn className="text-blue-600 text-2xl" />
            ) : (
              <FaToggleOff className="text-gray-500 text-2xl" />
            )}
          </button>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FaSync className={`text-xl ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Modern Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Error
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="py-4 px-6 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Locked
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Installed
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedMeters.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-gray-500 dark:text-gray-400">
                    <p className="text-lg font-medium">No meters found</p>
                    <p className="text-sm mt-2">Try changing filters or refreshing the list</p>
                  </td>
                </tr>
              ) : (
                paginatedMeters.map((meter) => {
                  const hasError = meter.error !== null;
                  const isSuspended = meter.managerId === null;

                  return (
                    <tr
                      key={meter.id}
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${isSuspended ? "bg-red-50/40 dark:bg-red-950/30" : ""
                        }`}
                    >
                      {/* Status */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">

                          {
                            isSuspended ? (
                              <FaCircleXmark className="text-orange-600 text-xl" />

                            ) : (
                              <FaCircleCheck className="text-green-600 text-xl" />

                            )
                          }

                          {/* {isSuspended && (
                            <span className="text-xs font-medium text-red-700 dark:text-red-400">
                              Pending Error
                            </span>
                          )} */}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => {
                              setSelectedMeter(meter);
                              setIsModalOpen("configure");
                            }}
                            className="text-gray-600 hover:text-blue-600 transition p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Configure"
                          >
                            <TbAdjustmentsCancel size={20} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedMeter(meter);
                              setIsModalOpen("jobs");
                            }}
                            className="text-gray-600 hover:text-indigo-600 transition p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="View Jobs"
                          >
                            <FiEye size={20} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedMeter(meter);
                              setIsModalOpen("delete");
                            }}
                            className="text-gray-600 hover:text-red-600 transition p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Delete"
                          >
                            <FiTrash size={20} />
                          </button>
                        </div>
                      </td>

                      {/* Serial */}
                      <td className="py-5 px-6">
                        <Link
                          to={`/manager/zone/meter/${meter.id}`}
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
                        >
                          {meter.serial}
                        </Link>
                      </td>

                      {/* Description + Error */}
                      <td className="py-5 px-6">
                        <div className="space-y-1 max-w-xl">
                          <p className="text-gray-900 dark:text-gray-200 font-medium truncate">
                            {meter.description || "—"}
                          </p>

                        </div>
                      </td>

                      {/* Error */}
                      <td className="py-5 px-6">
                        <div className="space-y-1 max-w-xl">

                          {hasError ? (
                            <div className="text-sm text-red-700 px-3 py-1.5">
                              {/* { meter.error ? (<> <span className="font-medium">Error: </span> {meter.error}</>):
                                (<> 
                                  <span className="font-medium">None </span></>)
                              } */}
                              <FaExclamationTriangle className="text-red-600 text-xl" />

                            </div>
                          ) : <>None</>}
                        </div>
                      </td>


                      {/* Type */}
                      <td className="py-5 px-6">
                        <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium uppercase">
                          {meter.type}
                        </span>
                      </td>

                      {/* Locked */}
                      <td className="py-5 px-6 text-center">
                        {meter.lock ? (
                          <FaToggleOn className="text-red-600 text-3xl mx-auto" />
                        ) : (
                          <FaToggleOff className="text-green-600 text-3xl mx-auto" />
                        )}
                      </td>

                      {/* Installed At */}
                      <td className="py-5 px-6 text-gray-700 dark:text-gray-300">
                        {format(new Date(meter.installedAt), "dd MMM yyyy • HH:mm")}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex gap-2">
              <button
                onClick={() => setPageIndex(0)}
                disabled={pageIndex === 0}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {"<<"}
              </button>
              <button
                onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                disabled={pageIndex === 0}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {"<"}
              </button>
              <button
                onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
                disabled={pageIndex === totalPages - 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {">"}
              </button>
              <button
                onClick={() => setPageIndex(totalPages - 1)}
                disabled={pageIndex === totalPages - 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {">>"}
              </button>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page <strong>{pageIndex + 1}</strong> of <strong>{totalPages}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Modals */}
      {isModalOpen === "delete" && selectedMeter && (
        <DeleteModel
          id={selectedMeter.id}
          onClose={() => {
            setIsModalOpen("");
            setSelectedMeter(null);
          }}
        />
      )}

      {isModalOpen === "jobs" && selectedMeter && (
        <Jobs
          id={selectedMeter.id}
          isOpen={true}
          onClose={() => {
            setIsModalOpen("");
            setSelectedMeter(null);
          }}
        />
      )}

      {isModalOpen === "configure" && selectedMeter && (
        <Setting
          serial={selectedMeter.serial}
          onClose={() => {
            setIsModalOpen("");
            setSelectedMeter(null);
          }}
        />
      )}
    </>
  );
};

export default ZoneMeters;