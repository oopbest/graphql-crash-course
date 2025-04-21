import cron from "cron";
import https from "https";

const URL = "https://graphql-crash-course-hqnv.onrender.com";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log("Cron job executed successfully");
      } else {
        console.log("GET request failed", res.statusCode);
      }
    })
    .on("error", (err) => {
      console.log("Error in cron job:", err);
    });
});

export default job;
