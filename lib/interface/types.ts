// src/features/schedule/types.ts

export interface Location {
  locationId: string;
  city: string;
  state: string;
  address: string;
  country: string;
  locationType: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartyAttributes {
  [key: string]: any;
}

export interface Party {
  party_id: string;
  party_type: string;
  party_name: string;
  email: string;
  phone_number: string;
  image: string;
  attributes: PartyAttributes;
  locations: Location;
}

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
  campaign: string;
  month: string;
  year: number;
  status: string;
}

export interface CallByDate {
  callDate: string;
  totalCount: number;
  party: Party[];
}

export interface SaleRep {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  saleRepPicture?: string;
  status: string;
  channelName: string;
  teamName: string;
  supervisorId: string;
  supervisorName: string;
  month: string;
}

export interface SingleScheduleDetail {
  saleRep: SaleRep;
  schedule: ScheduleInfo;
  allScheduleDates: string[];
  calls: CallByDate[];
  callsCount: number;
}

export interface SingleScheduleResponse {
  success: boolean;
  message: string;
  data: SingleScheduleDetail;
}
