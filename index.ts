import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import https = require("https");

admin.initializeApp();

export const google_cron_job = functions.pubsub
  .topic("google_cron_job")
  .onPublish(async () => {
    return new Promise((resolve, reject) => {
      const request = https.get(`your api route`, (res: any) => {
        res.on("end", resolve);
      });
      request.on("error", reject);
    });
  });
