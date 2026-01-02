// components/DoctorInfoCard.tsx
export default function DoctorInfoCard() {
  return (
    <div className="shadow-soft  rounded-8 p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-(--gray-8)">Doctor Details</h2>

      <div className="border-b"></div>

      <div className="grid grid-cols-6 gap-5  text-sm">
        <div>
          <p className="text-(--gray-5)">Email Address</p>
          <p className="font-bold text-lg text-(--gray-9)">sarah@gmail.com</p>
        </div>
        <div>
          <p className="text-(--gray-5)">Specialization</p>
          <p className="font-bold text-lg text-(--gray-9)">Cardiologist</p>
        </div>
        <div>
          <p className="text-(--gray-5)">Contact Number</p>
          <p className="font-bold text-lg text-(--gray-9)">0310-33241-324</p>
        </div>
        <div>
          <p className="text-(--gray-5)">License Number</p>
          <p className="font-bold text-lg text-(--gray-9)">5A-256F5-EE1G</p>
        </div>
        <div>
          <p className="text-(--gray-5)">Clinic Name</p>
          <p className="font-bold text-lg text-(--gray-9)">AKUH</p>
        </div>
        <div>
          <p className="text-(--gray-5)">Date Of Birth</p>
          <p className="font-bold text-lg text-(--gray-9)">19/5/1998</p>
        </div>
      </div>

      <span className="inline-block px-5 py-2 bg-(--warning-0) text-(--warning) rounded-8 text-sm font-medium">
        Under Review
      </span>
    </div>
  );
}
