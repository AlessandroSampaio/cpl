import moment from "moment";

export const formatDateTime = (date: Date) => {
  if (!date) return "";
  let new_date = date.toISOString().replace("Z", "");
  return new_date;
};

export const formatDate = (date: Date) => {
  if (!date) return "";
  let new_date = date.toISOString().slice(0, 10);
  return new_date;
};

export const dateFromString = (
  dateString: string,
  pattern: string = "DD/MM/YYYY",
) => {
  if (!dateString) return new Date();
  return moment(dateString, pattern).toDate();
};
