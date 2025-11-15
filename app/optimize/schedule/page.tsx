"use client";

import { useState } from "react";

const STATUS_COLORS = {
  Confirmed: "bg-green-100 text-green-800 border border-green-300",
  Pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  Cancelled: "bg-gray-200 text-gray-700 border border-gray-300",
  "No Show": "bg-red-200 text-red-800 border border-red-400",
  Completed: "bg-blue-100 text-blue-800 border border-blue-300",
};

const ISOTOPES = ["FDG", "F18 Amyloid", "PSMA", "Cardiac", "NaF", "Ga68", "F18"];

export default function SchedulePage() {
  const [filters, setFilters] = useState({
    patient: "",
    date: "",
    isotope: "",
    status: "",
  });

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      patient: "John Smith",
      date: "2025-02-20",
      time: "08:00",
      isotope: "FDG",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Mary Jones",
      date: "2025-02-20",
      time: "09:00",
      isotope: "PSMA",
      status: "No Show",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setSchedules((s) =>
      s.map((x) => (x.id === id ? { ...x, status: newStatus } : x))
    );
  };

  const handleFilterChange = (field, value) =>
    setFilters({ ...filters, [field]: value });

  const filtered = schedules.filter((x) => {
    return (
      (filters.patient === "" ||
        x.patient.toLowerCase().includes(filters.patient.toLowerCase())) &&
      (filters.date === "" || x.date === filters.date) &&
      (filters.isotope === "" ||
        x.isotope.toLowerCase().includes(filters.isotope.toLowerCase())) &&
      (filters.status === "" ||
        x.status.toLowerCase().includes(filters.status.toLowerCase()))
    );
  });

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold">Schedule</h1>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <h2 className="text-lg font-medium mb-3">Filters</h2>

        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <label className="font-medium block mb-1">Patient</label>
            <input
              className="input input-bordered w-full"
              placeholder="Search patient"
              value={filters.patient}
              onChange={(e) => handleFilterChange("patient", e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={filters.date}
              onChange={(e) => handleFilterChange("date", e.target.value)}
            />
          </div>

          <div>
            <label className="font-medium block mb-1">Isotope</label>
            <input
              className="input input-bordered w-full"
              placeholder="Type to search"
              value={filters.isotope}
              onChange={(e) =>
                handleFilterChange("isotope", e.target.value)
              }
              list="iso-list"
            />
            <datalist id="iso-list">
              {ISOTOPES.map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="font-medium block mb-1">Status</label>
            <select
              className="select select-bordered w-full"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">All</option>
              {Object.keys(STATUS_COLORS).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-sm border">
        <table className="table table-sm">
          <thead>
            <tr className="text-gray-700">
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Isotope</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((x) => (
              <tr key={x.id}>
                <td>{x.patient}</td>
                <td>{x.date}</td>
                <td>{x.time}</td>

                <td>
                  <input
                    className="input input-bordered input-sm w-32"
                    value={x.isotope}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSchedules((s) =>
                        s.map((row) =>
                          row.id === x.id ? { ...row, isotope: val } : row
                        )
                      );
                    }}
                    list="iso-list"
                  />
                </td>

                <td>
                  <div
                    className={`px-2 py-1 rounded text-xs inline-flex items-center gap-2 ${STATUS_COLORS[x.status]}`}
                  >
                    {x.status}

                    <select
                      className="bg-transparent text-xs outline-none"
                      value={x.status}
                      onChange={(e) =>
                        handleStatusChange(x.id, e.target.value)
                      }
                    >
                      {Object.keys(STATUS_COLORS).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-3 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
