"use client";

import { useState } from "react";

type Status =
  | "Scheduled"
  | "Confirmed"
  | "Pending Auth"
  | "Canceled"
  | "No Show";

interface ScheduleItem {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  isotope: string;
  insurance: string;
  status: Status;
}

const STATUS_COLORS: Record<Status, string> = {
  Scheduled:
    "bg-gray-200 text-gray-700 border border-gray-400",
  Confirmed:
    "bg-green-100 text-green-800 border border-green-300",
  "Pending Auth":
    "bg-yellow-100 text-yellow-800 border border-yellow-300",
  Canceled:
    "bg-red-100 text-red-700 border border-red-300",
  "No Show":
    "bg-yellow-300 text-red-700 border border-red-500 font-bold",
};

export default function SchedulePage() {
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterInsurance, setFilterInsurance] = useState("");
  const [filterIsotope, setFilterIsotope] = useState("");

  const [items, setItems] = useState<ScheduleItem[]>([
    {
      id: "SCH001",
      patientName: "John Doe",
      patientId: "P001",
      date: "2025-11-11",
      time: "09:00 AM",
      isotope: "F18 FDG",
      insurance: "Blue Cross",
      status: "Confirmed",
    },
    {
      id: "SCH002",
      patientName: "Jane Smith",
      patientId: "P002",
      date: "2025-11-11",
      time: "10:30 AM",
      isotope: "Ga-68 Dotatate",
      insurance: "Aetna",
      status: "Scheduled",
    },
  ]);

  const updateStatus = (id: string, newStatus: Status) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, status: newStatus } : x))
    );
  };

  const filtered = items.filter((x) => {
    return (
      (filterName === "" ||
        x.patientName.toLowerCase().includes(filterName.toLowerCase())) &&
      (filterDate === "" || x.date === filterDate) &&
      (filterStatus === "" || x.status === filterStatus) &&
      (filterInsurance === "" || x.insurance === filterInsurance) &&
      (filterIsotope === "" ||
        x.isotope.toLowerCase().includes(filterIsotope.toLowerCase()))
    );
  });

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold">Schedules</h1>

      {/* FILTERS */}
      <div className="grid grid-cols-5 gap-4 bg-gray-50 p-4 rounded shadow-sm border">
        <div>
          <label className="text-sm font-semibold block mb-1">
            Patient Name
          </label>
          <input
            className="input input-bordered w-full"
            placeholder="Search name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Date</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Status</label>
          <select
            className="select select-bordered w-full"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending Auth">Pending Auth</option>
            <option value="Canceled">Canceled</option>
            <option value="No Show">No Show</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Insurance</label>
          <input
            className="input input-bordered w-full"
            placeholder="Insurance"
            value={filterInsurance}
            onChange={(e) => setFilterInsurance(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-semibold block mb-1">Isotope</label>
          <input
            className="input input-bordered w-full"
            placeholder="Isotope"
            value={filterIsotope}
            onChange={(e) => setFilterIsotope(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Isotope</th>
              <th>Insurance</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.patientName}</td>
                <td>{x.patientId}</td>
                <td>{x.date}</td>
                <td>{x.time}</td>
                <td>{x.isotope}</td>
                <td>{x.insurance}</td>
                <td>
                  <select
                    className={`px-2 py-1 rounded text-sm ${STATUS_COLORS[x.status]}`}
                    value={x.status}
                    onChange={(e) =>
                      updateStatus(x.id, e.target.value as Status)
                    }
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending Auth">Pending Auth</option>
                    <option value="Canceled">Canceled</option>
                    <option value="No Show">No Show</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

