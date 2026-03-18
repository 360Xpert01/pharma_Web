"use client";

import React, { useEffect } from "react";
import ExpenseRequestItem from "./ExpenseRequestItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toast } from "react-hot-toast";
import {
  fetchPendingRequests,
  removeRequest,
} from "@/store/slices/PendingRequest/pendingRequestsSlice";
import {
  handleOtpRequest,
  clearHandleOtpState,
} from "@/store/slices/PendingRequest/handleOtpRequestsSlice";

const ExpenseApprovalList: React.FC = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((state: RootState) => state.pendingRequests);
  const { loading, success, lastProcessedRequestId } = useSelector(
    (state: RootState) => state.handleOtp
  );

  useEffect(() => {
    if (success && lastProcessedRequestId) {
      dispatch(removeRequest(lastProcessedRequestId));
      dispatch(clearHandleOtpState());
    }
  }, [success, lastProcessedRequestId, dispatch]);

  useEffect(() => {
    dispatch(fetchPendingRequests());
  }, [dispatch]);

  const handleApprove = async (id: string) => {
    try {
      await dispatch(handleOtpRequest({ requestId: id, status: "approved" })).unwrap();
      toast.success("OTP request approved successfully!");
      // Optional: refresh list, close modal, etc.
    } catch (err: any) {
      // err = rejectWithValue() se jo payload bheja tha thunk mein
      // toast.error(err?.message || "Failed to approve OTP request");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await dispatch(handleOtpRequest({ requestId: id, status: "rejected" })).unwrap();
      toast.success("OTP request rejected successfully!");
    } catch (err: any) {
      // toast.error(err?.message || "Failed to reject OTP request");
    }
  };

  return (
    <div className="mx-auto space-y-2">
      {requests.map((req, i) => (
        <ExpenseRequestItem
          key={req.id || i}
          title={req.userEmail || req.email}
          isLoading={loading && lastProcessedRequestId === req.id}
          onApprove={() => handleApprove(req.id)}
          onReject={() => handleReject(req.id)}
        />
      ))}
    </div>
  );
};

export default ExpenseApprovalList;
