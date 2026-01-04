export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
}

// Generate notification and activity data
export const generateNotificationData = (): NotificationItem[] => {
  return [
    {
      id: "1",
      title: "DCR Approvals Pending",
      description: "7 DCRs from Sindh South are awaiting approval",
      timestamp: "Just Now",
    },
    {
      id: "2",
      title: "Expense Claim Approved",
      description: "An expense claim by Rep A. Khan has been approved.",
      timestamp: "20 minutes ago",
    },
    {
      id: "3",
      title: "Expense Limit Exceeded",
      description: "An expense claim exceeded the daily limit.",
      timestamp: "41 minutes ago",
    },
    {
      id: "4",
      title: "Missed Morning Check-In",
      description: "3 reps missed their morning check-in today.",
      timestamp: "50 minutes ago",
    },
  ];
};
