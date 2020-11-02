///<reference path="types.ts" />

import express from "express";
import { Request, Response } from "express";

// some useful database functions in here:
import db from "./database";
import { browser, Event, eventName, weeklyRetentionObject } from "../../client/src/models/event";
import { ensureAuthenticated, validateMiddleware } from "./helpers";

import {
  shortIdValidation,
  searchValidation,
  userFieldsValidator,
  isUserValidator,
} from "./validators";
const router = express.Router();

// Routes

interface Filter {
  sorting: string;
  type?: eventName;
  browser?: browser;
  search?: string;
  offset?: number;
}
function getAllEvents(): Event[];
function getAllEvents(query: Filter): { more: boolean; events: Event[] };
function getAllEvents(query?: Filter): { more: boolean; events: Event[] } | Event[] {
  let more = false;
  let events = db.get("events").value();
  if (query) {
    if (Object.keys(query).some((val) => ["type", "browser", "search"].includes(val))) {
      let newRes = [];
      for (let i = 0; i < events.length; i++) {
        if (query.offset && Number(query.offset) === newRes.length) {
          more = true;
          break;
        }
        let type = query?.type ? query.type === events[i].name : true;
        let browser = query?.browser ? query.browser === events[i].browser : true;
        let search = query?.search
          ? Object.keys(events[i]).some((value) =>
              new RegExp(query.search!, "i").test(`${events[i][value as keyof Event]}`)
            )
          : true;
        if (type && browser && search) {
          newRes.push(events[i]);
        } else {
          more = true;
        }
      }
      events = newRes;
    }
    if (query.sorting) {
      let operator: string | undefined;
      let { sorting } = query;
      if (sorting[0] === "-" || sorting[0] === "+") {
        operator = sorting[0];
        sorting = sorting.slice(1);
      }
      if (sorting === "user") sorting = "distinct_user_id";
      events.sort((a, b) => {
        if (sorting == "date") return operator === "-" ? (a.date - b.date) * -1 : a.date - b.date;
        if (a[sorting as keyof Event] !== undefined && sorting !== "geolocation") {
          if ((a[sorting as keyof Event] as string[0]) < (b[sorting as keyof Event] as string[0]))
            return operator === "-" ? 1 : -1;
        }
        return 1;
      });
    }
    let answer = { events, more };
    return answer;
  }
  return events;
}

router.get("/all", (req: Request, res: Response) => {
  res.send(getAllEvents());
});

router.get("/all-filtered", (req: Request, res: Response) => {
  res.send(getAllEvents(req.query));
});

router.get("/by-days/:offset", (req: Request, res: Response) => {
  let offset = +req.params.offset;
  let today = Date.now();
  let answer: any = {};
  let day = 1000 * 60 * 60 * 24;
  let start = today - offset * day;
  for (let i = 6; i >= 0; i--) {
    let date = new Date(start - i * day).toLocaleDateString();
    answer[date] = {};
  }
  let events = getAllEvents();
  events.forEach((event) => {
    let dateString = new Date(event.date).toLocaleDateString();
    if (Object.keys(answer).includes(dateString)) {
      answer[dateString][event.session_id] = 1;
    }
  });
  let result: { date: string; count: number }[] = [];
  for (let date in answer)
    result.push({ date: date.replace(/\./g, "/"), count: Object.keys(answer[date]).length });

  res.send(result);
});

router.get("/by-hours/:offset", (req: Request, res: Response) => {
  let offset = +req.params.offset;
  let today = new Date();
  let answer: any = {};
  let hour = 1000 * 60 * 60;
  let day = hour * 24;
  let events = getAllEvents();
  let midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  let elapsedSinceMidnight = today.getTime() - midnight.getTime();
  if (offset === 0) {
    for (let i = 23; i >= 0; i--) {
      answer[String(i).padStart(2, "0") + `:00`] = {};
    }
    events.forEach(event=>{
      if (today.getTime()-elapsedSinceMidnight<event.date){
        let time = String(new Date(event.date).getHours()).padStart(2, "0") + `:00`;
        answer[time][event.session_id] = 1;
      }
    })
    // let now = today.getHours();
    // while (Object.keys(answer).length < 24) {
    //   answer[String(now).padStart(2, "0") + `:00`] = {};
    //   now--;
    //   if (now < 0) now = 23;
    // }

    // events.forEach((event) => {
    //   if (today.getTime() - event.date <= day) {
    //     let time = String(new Date(event.date).getHours()).padStart(2, "0") + `:00`;
    //     answer[time][event.session_id] = 1;
    //   }
    // });
  } else {
    for (let i = 23; i >= 0; i--) {
      answer[String(i).padStart(2, "0") + `:00`] = {};
    }

    let timeTravel = elapsedSinceMidnight + (offset - 1) * day;
    events.forEach((event) => {
      if (
        today.getTime() - timeTravel - day < event.date &&
        event.date < today.getTime() - timeTravel
      ) {
        let time = String(new Date(event.date).getHours()).padStart(2, "0") + `:00`;
        answer[time][event.session_id] = 1;
      }
    });
  }
  
  let result: { hour: string; count: number }[] = [];
  for (let date in answer) result.push({ hour: date, count: Object.keys(answer[date]).length });

  res.send(result);
});

router.get("/today", (req: Request, res: Response) => {
  res.send("/today");
});

router.get("/week", (req: Request, res: Response) => {
  res.send("/week");
});

router.get("/retention", (req: Request, res: Response) => {
  const { dayZero } = req.query;
  res.send("/retention");
});
router.get("/:eventId", (req: Request, res: Response) => {
  res.send("/:eventId");
});

router.post("/", (req: Request, res: Response) => {
  if (req.body as Event) {
    console.log(req.body);
    db.get("events").push(req.body).write();
  }
  res.send({ seccess: true });
});

router.get("/chart/os/:time", (req: Request, res: Response) => {
  res.send("/chart/os/:time");
});

router.get("/chart/pageview/:time", (req: Request, res: Response) => {
  res.send("/chart/pageview/:time");
});

router.get("/chart/timeonurl/:time", (req: Request, res: Response) => {
  res.send("/chart/timeonurl/:time");
});

router.get("/chart/geolocation/:time", (req: Request, res: Response) => {
  res.send("/chart/geolocation/:time");
});

export default router;
