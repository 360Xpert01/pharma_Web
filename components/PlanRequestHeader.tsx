import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "react-hot-toast";
import { handleSchedule } from "@/store/slices/plan-Manage/scheduleHandleSlice";
import { fetchScheduleDetail } from "@/store/slices/plan-Manage/singleScheduleDetailSlice";

export default function PlanRequestHeader({
  id,
  scheduleStatus,
}: {
  id: string;
  scheduleStatus: string;
}) {
  const dispatch = useDispatch<any>();
  const { loading, success, error } = useSelector((state: RootState) => state.scheduleHandle);

  const handleAccept = () => {
    if (loading) return;
    dispatch(
      handleSchedule({
        scheduleId: id,
        payload: { status: "Accepted", notes: "Approved by supervisor" },
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Schedule accepted successfully!");
        dispatch(fetchScheduleDetail(id));
      })
      .catch((err: any) => {
        console.log("error", err);
        toast.error(err || "Failed to accept schedule");
      });
  };

  const handleReject = () => {
    if (loading) return;
    dispatch(
      handleSchedule({
        scheduleId: id,
        payload: { status: "Rejected", notes: "Not suitable at this time" },
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Schedule rejected");
        dispatch(fetchScheduleDetail(id));
      })
      .catch((err: any) => {
        console.log("error", err);
        toast.error(err || "Failed to reject schedule");
      });
  };

  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="t-h1">Plan Request</h1>
        <p className="t-md mt-1">Unlock the potential of your candidates</p>
      </div>

      {/* <div className="flex space-x-1 mt-5">
        {avatars.map((src, i) => (
          <Avatar key={i} className="h-12 w-12 border-2 border-(--light)">
            <AvatarImage src="/girlPic.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ))}
      </div> */}
      <div className="flex mt-5 gap-8">
        {scheduleStatus === "Pending" && (
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              disabled={loading}
              className={`text-(--destructive) border border-(--destructive) rounded-8 flex items-center gap-2 px-4 py-2 bg-(--background) hover:bg-(--destructive-0) ${loading ? "opacity-50 cursor-not-allowed" : "!cursor-pointer"}`}
            >
              <X className="w-4" />
              Reject
            </button>
            <button
              onClick={handleAccept}
              disabled={loading}
              className={`bg-(--primary) hover:bg-(--primary-2) text-(--light) rounded-8 flex items-center gap-2 px-4 py-2 ${loading ? "opacity-50 cursor-not-allowed" : "!cursor-pointer"}`}
            >
              {loading ? "Processing..." : "Accept"}
              {!loading && <ChevronRight className="w-4" />}
            </button>
          </div>
        )}
        {/* {scheduleStatus !== "Pending" && (
          <button className="bg-(--primary) hover:bg-(--primary-2) text-(--light) cursor-pointer rounded-8 flex items-center gap-2 px-4 py-2">
            {scheduleStatus}
          </button>
        )} */}
      </div>
    </div>
  );
}
