import { postData } from "../postData";
import { checkRes, errorHandle } from "../error";
import { alertPop } from "../message";
import { validateText } from "../validate";

export const createMeeting = async data => {
  let ret = false;
  let post_data = {};
  post_data = {
    attendees: data.attendees,
    date: data.date,
    discussion_point: data.discussion_point,
    meeting_location: data.meeting_location,
    room_id: data.room_id,
    meeting_with: data.meeting_with,
    purpose: data.purpose,
    time_from: data.time_from,
    time_to: data.time_to,
    title: data.title,
    meeting_type: data.meeting_type,
    location_name: data.location_name,
    location_address: data.location_address,
    location_latlong: data.location_latlong
  };
  if (data.meeting_type === 0 && data.meeting_with === "Company") {
    post_data = {
      ...post_data,
      company_id: data.company_id,
      branch_id: data.branch_id,
      contact_person_id: data.person_id
    };
  } else if (data.meeting_type === 0 && data.meeting_with === "Individual") {
    post_data = {
      ...post_data,
      meeting_with_person_name: data.person_name,
      meeting_with_person_company: data.person_institute,
      meeting_with_person_contact: data.person_contact
    };
  }
  if (validateText(data.discussion_point) !== 'error') {
    let res = await postData("rooms/v1/meeting/create", post_data);
  if (res) {
    if (checkRes(res.status)) {
      alertPop("success", "Meeting created");
      ret = true;
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  } else {
    errorHandle(res);
  }
  }
  return ret;
};
