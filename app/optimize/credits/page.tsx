"use client";

import OptimizeTabs from "@/components/OptimizeTabs";
import { useState } from "react";

export default function CreditsPage() {
  const [credits, setCredits] = useState([
    {
      id: 1,
      patient: "John Doe",
      isotope: "F-18 FDG",
      vendor: "Cardinal Health",
      status: "Pending",
      date: "11/12/25"
    },
    {
      id: 2,
      patient: "Sarah Smith",
      isotope: "Pylarify",
      vendor: "GE Healthcare",
      status: "Issued",
      date: "11/14/25"
    }
  ]);

  const statusColors: any = {
    Pending: "bg-yellow-200",
    Issued: "bg-green-200",
    Denied: "bg-red-200"
  };

  const updateStatus = (id: number, newStatus: string) => {
    setCredits(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
  };

  return (
    <>
      <OptimizeTabs active="/optimize/credits" />

      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Dose Credits</h1>

        <div className="card space-y-4">
          {credits.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <div className="font-medium">{item.patient}</div>
                <div className="text-sm text-slate-600">
                  {item.isotope} • {item.vendor} • {item.date}
                </div>
              </div>

              <select
                className={`px-3 py-1 rounded ${statusColors[item.status]}`}
                value={item.status}
                onChange={e => updateStatus(item.id, e.target.value)}
              >
                <option>Pending</option>
                <option>Issued</option>
                <option>Denied</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
// credits page will be filled later
