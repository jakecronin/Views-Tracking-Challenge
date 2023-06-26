import * as functions from "firebase-functions";
import {handleTrackRecordingView} from "./track-recording-view";
import * as admin from "firebase-admin";
import * as serviceAccount from "../sirocodingchallenges-firebase-adminsdk-d5epk-d5345de48d.json";
import {ServiceAccount} from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  projectId: "sirocodingchallenges",
});

// assumes the request has been authenticated, the caller has the required permissions
export const trackRecordingView = functions.https.onRequest(async (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Methods", "POST");
  response.set("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "POST") {
    try {
      const {viewerId, recordingId} = request.body;
      await handleTrackRecordingView(viewerId, recordingId);
      // it worked!
      response.status(200).send("No errors!");
    } catch (e) {
      // it didn't work :/
      functions.logger.error(e);
      response.status(500).send("We messed up :(");
    }
  } else if (request.method === "OPTIONS") {
    response.status(204).send("Go ahead");
  } else {
    functions.logger.debug("request wasn't a POST or OPTIONS");
    response.status(400).send("only OPTIONS or POST requests are allowed");
  }
});
