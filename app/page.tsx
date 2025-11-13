import Link from "next/link";
export default function Home(){
  return (
    <div className="py-8 space-y-6">
      <div className="text-3xl font-semibold">DoseVision</div>
      <div className="card">
        <div className="text-lg font-medium mb-2">Navigate</div>
        <div className="flex gap-4 flex-wrap">
          <Link className="btn btn-primary" href="/optimize/schedule">Schedule</Link>
          <Link className="btn btn-primary" href="/optimize/vendors">Vendors</Link>
          <Link className="btn btn-primary" href="/optimize/insurance">Health Insurance</Link>
          <Link className="btn btn-primary" href="/optimize/credits">Dose Credits</Link>
        </div>
      </div>
    </div>
  );
}
