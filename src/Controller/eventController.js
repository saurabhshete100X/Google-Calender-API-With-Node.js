const { google } = require("googleapis");

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth;

 CLIENT_ID = "846818620498-1cgn3g0vm1042s12u7gr5j1iiogbrrr5.apps.googleusercontent.com",
 CLIENT_SECRET = "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",
 REDIRECT_URI = "https://calendar.google.com/calendar/embed?src=a038cc478efda8485ee074d409748320e198528f3112fe81897c4c884089118e%40group.calendar.google.com&ctz=Asia%2FKolkata"

// Create a new instance of oAuth and set our Client ID & Client Secret.
const oAuth2Client = new OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.

 REFRESH_TOKEN ="1//042Wef0j5b_uhCgYIARAAGAQSNwF-L9Ir46BQ_8E9-HpIhyetpOY1gRDDEhryszYq0qKmba6AuGV4ilj4C0ri_qEwVCG4o3NeaJM"
oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});
const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

// Function to convert the date into the format that Google Calendar API needs
const TIMEOFFSET = "+5:30";
const dateTimeforCalendar = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  const newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;
  const event = new Date(Date.parse(newDateTime));

  const startDate = event;
  const endDate = new Date(
    new Date(startDate).setHours(startDate.getHours() + 1)
  );

  return {
    start: startDate,
    end: endDate,
  };
};

let dateTime = dateTimeforCalendar();

// Event for Google Calendar
let event = {
  summary: `Meeting to discuss GoogleApi Integration`,
  location: `Globussoft, Bhilai`,
  description: `Incorporate Calendar, Drive, Mail apis into Empmonitor. Where employees can track, schedule events.`,
  colorId: 1,
  start: {
    dateTime: dateTime["start"],
    timeZone: "Asia/Kolkata",
  },
  end: {
    dateTime: dateTime["end"],
    timeZone: "Asia/Kolkata",
  },
  attendees: [
    { email: "matiyaranitish@gmail.com" },
    { email: "johnathank577@gmail.com" },
  ],
};

let GOOGLE_CALENDAR_ID ="a038cc478efda8485ee074d409748320e198528f3112fe81897c4c884089118e@group.calendar.google.com"

// READ/GET All Events between two dates
const getAllEvents = async (start, end) => {
  try {
    const response = await calendar.events.list({
      auth: oAuth2Client,
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: start,
      timeMax: end,
      timeZone: "Asia/Kolkata",
    });

    const items = response["data"]["items"];
    return items;
  } catch (error) {
    return `Error at getEvents --> ${error}`;
  }
};

module.exports = {
  dateTime,
  event,
  getAllEvents,
};
