import { BaseUrl } from "./BaseUrl";


//Get

export const GetDueVehicles = `${BaseUrl}/vehicle/all/due`;
export const GetScheduleVehicles = `${BaseUrl}/vehicle/all/scheduled`;
export const GetUnderServicingVehicles = `${BaseUrl}/vehicle/all/underServicing`
export const GetCompletedVehicles = `${BaseUrl}/vehicle/all/serviced`;

export const GetVehiclesSummary = `${BaseUrl}/admin/summary`;

//Post

export const RegisterVehicle = `${BaseUrl}/vehicle/register`;


