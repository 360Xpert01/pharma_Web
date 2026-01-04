// components/DoctorInfoCard.tsx
export default function DoctorInfoCard() {
  return (
    <div className="shadow-soft rounded-8 p-5 bg-(--background)">
      <div className="flex justify-between">
        <h2 className="t-h2">Doctor Details</h2>
        <span className="inline-block px-5 py-2 bg-(--warning-0) text-(--warning) rounded-8 text-sm font-medium">
          Under Review
        </span>
      </div>

      <div className="border-b my-4"></div>

      <div className="grid grid-cols-3 gap-6 text-sm">
        <div>
          <p className="t-sm text-(--subheading-color)">Email Address</p>
          <p className="t-val-sm">sarah@gmail.com</p>
        </div>
        <div>
          <p className="t-sm text-(--subheading-color)">Specialization</p>
          <p className="t-val-sm">Cardiologist</p>
        </div>
        <div>
          <p className="t-sm text-(--subheading-color)">Contact Number</p>
          <p className="t-val-sm">0310-33241-324</p>
        </div>
        <div>
          <p className="t-sm text-(--subheading-color)">License Number</p>
          <p className="t-val-sm">5A-256F5-EE1G</p>
        </div>
        <div>
          <p className="t-sm text-(--subheading-color)">Clinic Name</p>
          <p className="t-val-sm">AKUH</p>
        </div>
        <div>
          <p className="t-sm text-(--subheading-color)">Date Of Birth</p>
          <p className="t-val-sm">19/5/1998</p>
        </div>
      </div>
    </div>
  );
}
