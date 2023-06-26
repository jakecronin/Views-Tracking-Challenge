import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();

/* BONUS OPPORTUNITY
It's not great (it's bad) to throw all of this code in one file.
Can you help us organize this code better?
*/

export interface User {
  // Id matches the document id in the Users collection
  id: string;

  // uniqueRecordingViewCount is the number of distinct recordings viewed by this user
  uniqueRecordingViewCount?: number;
}

export interface Recording {
  // Id matches document id in the Recordings collection
  id: string;

  // CreatorId is the Id of the user who made this recording
  creatorId: string;

  // uniqueViewCount is the number of distinct users that viewed this recording
  uniqueViewCount?: number;
}

export enum Collections {
    Users = "Users",
    Recordings = "Recordings"
}

export async function handleTrackRecordingView(viewerId: string, recordingId: string): Promise<void> {
  // TODO: implement this function

  // logs can be viewed in the firebase emulator ui
  functions.logger.debug("viewerId: ", viewerId);
  functions.logger.debug("recordingId: ", recordingId);


  // ATTN: the rest of the code in this file is only here to show how firebase works

  // read from a document
  const documentSnapshot = await db.collection("collection").doc("doc").get();
  if (documentSnapshot.exists) {
    const data = documentSnapshot.data();
    functions.logger.debug("it did exist!", data);
  } else {
    functions.logger.debug("it didn't exist");
  }


  // write to a document using set or update
  // set overwrites existing data and creates new documents if necessary
  await db.collection("collection").doc("doc").set({id: "id", field: "foo"});
  // update will fail if the document exists and will only update fields included
  // in your update
  await db.collection("collection").doc("doc").set({id: "id", field: "bar"});

  // read more about transactions, batch writes etc here:
  // https://firebase.google.com/docs/firestore/manage-data/transactions#web-version-9
}
