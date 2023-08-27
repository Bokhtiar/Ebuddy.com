import { ActionType } from "../@types";
import { Status } from "./Status";

export class Message {
    [ActionType.PERMISSIONS[Status.SUCCESS]] = "Success";
    [ActionType.PERMISSIONS[Status.ERROR]] = "Error";
}