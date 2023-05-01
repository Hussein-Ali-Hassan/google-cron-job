import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import https = require("https");

admin.initializeApp();

// run every n minutes and call the api in our app to check for payments deadlines
export const check_payment_deadline = functions.pubsub
  .topic("check_payment_deadline")
  .onPublish(async () => {
    return new Promise((resolve, reject) => {
      const request = https.get(
        `https://system.viandesmetropolitain.ca/api/orders/batch-cron-job`,
        (res: any) => {
          res.on("end", resolve);
        }
      );
      request.on("error", reject);
    });
  });
