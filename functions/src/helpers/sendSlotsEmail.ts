import nodemailer from "nodemailer";
import Config from "../Config";
import { AppointmentSlots } from "../types/AppointmentSlots";
import { UserData } from "../types/UserData";
import _ from "lodash";

const prepareHtml = (appointments: AppointmentSlots[]) => {
  let html = `<h1 style="font-size: 28px; margin: 0px; padding: 0px">Znaleziono wolne terminy!</h1>`;

  for (let appointment of appointments) {
    _(appointment.slots)
      .groupBy("specializationName")
      .forEach((specjalizationSlots, specializationKey) => {
        html += `<h2 style="margin: 0px; padding: 0px; font-size: 20px; margin-top: 8px">${specializationKey}</h2>`;
        html += `<ul style="margin-top: 8px; padding-left: 8px">`;

        _(specjalizationSlots)
          .groupBy("doctorName")
          .forEach((doctorSlots, doctorKey) => {
            html += `<li>${doctorKey}<ul style="margin-top: 4px; padding-left: 0px">`;
            doctorSlots.forEach((slot) => {
              html += `<li>${slot.appointmentDate}</li>`;
            });
            html += "</ul></li>";
          });
        html += `</ul>`;
      });
  }

  return html;
};

export const sendSlotsEmail = async (
  userData: UserData,
  appointments: AppointmentSlots[]
) => {
  const transporter = nodemailer.createTransport({
    host: Config.mail.host,
    port: Config.mail.port,
    auth: {
      user: Config.mail.user,
      pass: Config.mail.password,
    },
  });
  transporter.sendMail({
    to: userData.email,
    from: {
      name: "Medicover Slots Notifier",
      address: "slots@medicover-slots-notifier.michalskimateusz.pl",
    },
    subject: "Wolne terminy - Medicover Slots Notifier",
    html: prepareHtml(appointments),
  });
};
