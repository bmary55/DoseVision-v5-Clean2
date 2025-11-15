"use client";

import { useState, useMemo } from "react";

const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  Received: "bg-green-100 text-green-800 border border-green-300",
  Denied: "bg-red-100 text-red-800 border border-red-300",
};

const REASONS = [
  "Dose decay - patient rescheduled",
  "Patient no show",
  "Scanner issue",
  "Vendor delay",
  "Wrong isotope delivered",
];

export default function DoseCredits() {
  const [credits, setCredits] = useState([
    {
      id: "DC001",
      patientId: "P001",
      patientName: "John Doe",
      isotope: "F18 FDG (Fluorodeoxyglucose)",
      scheduleDate: "2025-11-10",
      submitted: "2025-11-08",
      received: "2025-11-09",
      reason: "Dose decay - patient rescheduled",
      status: "Received",
    },
    {
      id: "DC002",
      patientId: "P002",
      patientName: "Jane Smith",
      isotope: "Ga-68 Dotatate",
      scheduleDate: "2025-11-14",
      submitted: "2025-11-14",
      received: "",
      reason: "Patient no show",
      status: "Pending",
    },
  ]);

  const [filters, setFilters] = useState({
    status: "",
    reason: "",
  });

  const filteredCredits = useMemo(() => {
    return credits.filter((c) => {
      return (
        (filters.status === "" ||
          c.status.toLowerCase() === filters.status.toLowerCase()) &&
        (filters.reason === "" ||
          c.reason.toLowerCase() === filters.reason.toLowerCase())
      );
    });
  }, [credits, filters]);

  const updateStatus = (id, newStatus) => {
    setCredits((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleDelete = (id) => {
    setCredits((prev) => prev.filter((c) => c.id !== id));
  };

  const total = credits.length;
  const received = credits.filter((x) => x.status === "Received").length;
  const pending = credits.filter((x) => x.status === "Pending").length;
  const completionRate = total > 0 ? Math.floor((received / total) * 100) : 0;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold">Dose Credits</h1>
      <p className="text-gray-600">Track dose credits and reimbursements</p>

      {/* KPI CARDS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <div className="text-gray-500">Total Credits</div>
          <div className="text-3xl font-semibold text-blue-900">{total}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <div className="text-gray-500">Pending</div>
          <div className="text-3xl font-semibold text-yellow-600">{pending}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <div className="text-gray-500">Received</div>
          <div className="text-3xl font-semibold text-green-600">
            {received}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow border text-center">
          <div className="text-gray-500">Completion Rate</div>
          <div className="text-3xl font-semibold text-blue-900">
            {completionRate}%
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-5 rounded-xl shadow border space-y-4">
        <h2 className="text-lg font-semibold">Filters</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="font-medium block mb-1">Status</label>
            <select
              className="select select-bordered w-full"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Credits</option>
              <option>Pending</option>
              <option>Received</option>
              <option>Denied</option>
            </select>
          </div>

          <div>
            <label className="font-medium block mb-1">Reason</label>
            <select
              className="select select-bordered w-full"
              value={filters.reason}
              onChange={(e) =>
                setFilters({ ...filters, reason: e.target.value })
              }
            >
              <option value="">All Reasons</option>
              {REASONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="btn w-full mt-2"
          onClick={() => setFilters({ status: "", reason: "" })}
        >
          Clear Filters
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-5 rounded-xl shadow border">
        <h2 className="text-lg font-semibold mb-3">
          Dose Credits ({filteredCredits.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-gray-500 font-medium">
              <tr>
                <th>ID</th>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Isotope</th>
                <th>Schedule Date</th>
                <th>Submitted</th>
                <th>Received</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCredits.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.patientId}</td>
                  <td>{c.patientName}</td>
                  <td>{c.isotope}</td>
                  <td>{c.scheduleDate}</td>
                  <td>{c.submitted}</td>
                  <td>{c.received || "-"}</td>
                  <td>{c.reason}</td>

                  <td>
                    <select
                      className={`px-2 py-1 rounded text-xs ${STATUS_STYLES[c.status]}`}
                      value={c.status}
                      onChange={(e) =>
                        updateStatus(c.id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>Received</option>
                      <option>Denied</option>
                    </select>
                  </td>

                  <td className="flex gap-3">
                    <button
                      className="text-blue-600 text-sm"
                      onClick={() => alert("Edit modal coming soon")}
                    >
                      ✎
                    </button>
                    <button
                      className="text-red-600 text-sm"
                      onClick={() => handleDelete(c.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCredits.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-gray-500">
                    No credits match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
