// src/features/schedule/types.ts

export interface Clinic {
  clinicId: string;
  clinicName: string;
  clinicAddress: string;
  clinicCity: string;
}

export interface Doctor {
  id: string;
  fullname: string;
  email: string;
  specialization: string;
  qualification: string;
  clinic: Clinic;
}

export interface ScheduleInfo {
  id: string;
  month: number;
  year: number;
  status: string;
}

export interface CallByDate {
  callDate?: string;
  totalCount: number;
  doctor: Doctor[];
  schedule?: ScheduleInfo;
  allScheduleDates?: string[];
}

export interface SaleRep {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  status: string;
  channelName: string;
  teamName: string;
  supervisorId: string;
  supervisorName: string;
}

export interface SingleScheduleDetail {
  saleRep: SaleRep;
  calls: CallByDate[];
  callsCount: number;
}

export interface SingleScheduleResponse {
  success: boolean;
  message: string;
  data: SingleScheduleDetail;
}
