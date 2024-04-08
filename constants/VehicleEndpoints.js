import { BaseUrl } from "./BaseUrl";


//Get

export const GetDueVehicles = `${BaseUrl}/vehicle/get/all/due`;
export const GetScheduleVehicles = `${BaseUrl}/vehicle/get/all/scheduled`;
export const GetCompletedVehicles = `${BaseUrl}/vehicle/get/all/serviced`;

//Post

export const RegisterVehicle = `${BaseUrl}/vehicle/register`;


