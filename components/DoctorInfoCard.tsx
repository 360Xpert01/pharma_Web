// components/DoctorInfoCard.tsx
export default function DoctorInfoCard() {
  return (
    <div className="shadow-[0px_5px_10px_rgba(0,0,0,0.20)]  rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Doctor Details</h2>

      <div className="border-b"></div>

      <div className="grid grid-cols-6 gap-5  text-sm">
        <div>
          <p className="text-gray-500">Email Address</p>
          <p className="font-bold text-lg text-gray-900">sarah@gmail.com</p>
        </div>
        <div>
          <p className="text-gray-500">Specialization</p>
          <p className="font-bold text-lg text-gray-900">Cardiologist</p>
        </div>
        <div>
          <p className="text-gray-500">Contact Number</p>
          <p className="font-bold text-lg text-gray-900">0310-33241-324</p>
        </div>
        <div>
          <p className="text-gray-500">License Number</p>
          <p className="font-bold text-lg text-gray-900">5A-256F5-EE1G</p>
        </div>
        <div>
          <p className="text-gray-500">Clinic Name</p>
          <p className="font-bold text-lg text-gray-900">AKUH</p>
        </div>
        <div>
          <p className="text-gray-500">Date Of Birth</p>
          <p className="font-bold text-lg text-gray-900">19/5/1998</p>
        </div>
      </div>

      <span className="inline-block px-5 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
        Under Review
      </span>
    </div>
  );
}
