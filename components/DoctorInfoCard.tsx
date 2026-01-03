// components/DoctorInfoCard.tsx
export default function DoctorInfoCard() {
  return (
    <div className="shadow-soft  rounded-8 p-6 space-y-6">
      <h2 className="t-h2">Doctor Details</h2>

      <div className="border-b"></div>

      <div className="grid grid-cols-6 gap-5  text-sm">
        <div>
          <p className="t-sm">Email Address</p>
          <p className="t-val-sm">sarah@gmail.com</p>
        </div>
        <div>
          <p className="t-sm">Specialization</p>
          <p className="t-val-sm">Cardiologist</p>
        </div>
        <div>
          <p className="t-sm">Contact Number</p>
          <p className="t-val-sm">0310-33241-324</p>
        </div>
        <div>
          <p className="t-sm">License Number</p>
          <p className="t-val-sm">5A-256F5-EE1G</p>
        </div>
        <div>
          <p className="t-sm">Clinic Name</p>
          <p className="t-val-sm">AKUH</p>
        </div>
        <div>
          <p className="t-sm">Date Of Birth</p>
          <p className="t-val-sm">19/5/1998</p>
        </div>
      </div>

      <span className="inline-block px-5 py-2 bg-(--warning-0) text-(--warning) rounded-8 text-sm font-medium">
        Under Review
      </span>
    </div>
  );
}
