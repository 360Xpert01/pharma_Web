"use client";

import React, { useEffect } from "react";
import ExpenseRequestItem from "./ExpenseRequestItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
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

  const handleApprove = (id: string) => {
    dispatch(handleOtpRequest({ requestId: id, status: "approved" }));
  };

  const handleReject = (id: string) => {
    dispatch(handleOtpRequest({ requestId: id, status: "rejected" }));
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
