import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = dayjs.tz.guess();

export const dateFormat = (time: string = ""): string => {
  return dayjs(time).tz(TIMEZONE).format("D MMM YYYY h:mm A	").toString();
};
