import { isBefore, subDays } from "date-fns";

export const shouldSendSlotNotification = (date?: Date) =>
  date ? isBefore(date, subDays(new Date(), 1)) : true;
