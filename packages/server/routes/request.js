const express = require("express");
const db = require("../db/users");
const dbRequest = require("../db/request");
const authMiddleware = require("../middleware/auth");
const {
  textMentorRequest,
  textGuardianConfirmation,
  emailMentorRequest,
  emailGuardianConfirmation,
  sentParentARequestReplyEmail,
  sentMentorARequestReplyEmail,
  textParentRequest,
  textMentorReplyRequest,
} = require("../messaging");
const router = express.Router();
const NOTIFICATION_PREFERENCES = {
  SMS: "PHONE",
  EMAIL: "EMAIL",
};

router.post("/sendRequest", async (req, res) => {
  const user = await db.getUserByEmail(req.body.mentorEmailAddress);

  const { message, parentId, studentID, studentName } = req.body;
  //const parentUID = req.user.uid;

  const mentor = await db.getUser(user.uid);
  const parent = await db.getUser(parentId);

  // We want to keep logs of all messages on Firestore.
  await db.addMessageToDB(user.uid, parentId, studentID, studentName, message);

  // Default to email if preference not specify
  const mentorPreference =
    mentor.notificationPreference || NOTIFICATION_PREFERENCES.EMAIL;
  if (mentorPreference.toUpperCase() === NOTIFICATION_PREFERENCES.EMAIL) {
    emailMentorRequest(mentor, parent, studentName, message)
      .then(emailGuardianConfirmation(mentor, parent, studentName))
      .then(() => res.send({ status: 200 }));
  } else if (mentorPreference.toUpperCase() === NOTIFICATION_PREFERENCES.SMS) {
    // Use Twilio.
    textMentorRequest(mentor, parent, studentName, message)
      .then(textGuardianConfirmation(mentor, parent, studentName))
      .then(() => res.send({ status: 200 }));
  } else {
    res.sendStatus(400);
  }
});

router.post("/getRequests", async (req, res) => {
  const id = req.body.id;
  const requesterDetails = await db.getUser(id);
  const requesterRole = requesterDetails.role;
  if (requesterRole == "MENTOR") {
    const requestCollection = await dbRequest.getRequestByMentor(id);
    if (requestCollection.length > 0) {
      const finalOutput = [];
      for (
        const requestRow = 0;
        requestRow < requestCollection.length;
        requestRow++
      ) {
        const requestRecord = requestCollection[requestRow].messageObj;
        const mentorDetails = await db.getUser(requestRecord.mentorUID);
        const messageId = requestCollection[requestRow].messageId;
        const obj = {
          messageId: messageId,
          parentDetails: requesterDetails,
          mentorDetails: mentorDetails,
          studentDetails: {
            name: requestRecord.studentName,
            studentUID: requestRecord.studentUID,
          },
          requestDetails: requestRecord,
          requestStatus: requestRecord.requestStatus,
          requestedDate: requestRecord.createdDate,
          acceptedDate:
            requestRecord.requestStatus == "Active"
              ? requestRecord.acceptedDate
              : "",
          archivedDate:
            requestRecord.requestStatus == "Archived"
              ? requestRecord.archivedDate
              : "",
          rejectedDate:
            requestRecord.requestStatus == "Rejected"
              ? requestRecord.rejectedDate
              : "",
        };
        finalOutput.push(obj);
      }
      res.send({
        status: 200,
        result: finalOutput,
        message: "Requests found.",
      });
    } else {
      res.send({ status: 200, result: [], message: "No Requests Yet." });
    }
  } else {
    const requestCollection = await dbRequest.getParentsRequest(id);
    if (requestCollection.length > 0) {
      const finalOutput = [];
      for (
        const requestRow = 0;
        requestRow < requestCollection.length;
        requestRow++
      ) {
        const requestRecord = requestCollection[requestRow].messageObj;
        const mentorDetails = await db.getUser(requestRecord.mentorUID);
        const messageId = requestCollection[requestRow].messageId;
        const obj = {
          messageId: messageId,
          parentDetails: requesterDetails,
          mentorDetails: mentorDetails,
          studentDetails: {
            name: requestRecord.studentName,
            studentUID: requestRecord.studentUID,
          },
          requestDetails: requestRecord,
          requestStatus: requestRecord.requestStatus,
          requestedDate: requestRecord.createdDate,
          acceptedDate:
            requestRecord.requestStatus == "Active"
              ? requestRecord.acceptedDate
              : "",
          archivedDate:
            requestRecord.requestStatus == "Archived"
              ? requestRecord.archivedDate
              : "",
          rejectedDate:
            requestRecord.requestStatus == "Rejected"
              ? requestRecord.rejectedDate
              : "",
        };
        finalOutput.push(obj);
      }
      res.send({
        status: 200,
        result: finalOutput,
        message: "Requests found.",
      });
    } else {
      res.send({ status: 200, result: [], message: "No Requests Yet." });
    }
  }
});

router.post("/acceptRequest", authMiddleware, async (req, res) => {
  console.log(
    "Hey! This post request isn't actually check that the right user is accepting the request. Please fix this. It makes me sad. It makes my dog sad. You don't want to make my dog sad"
  );
  // TODO(johanc) - Secure this endpoint.

  const messageId = req.body.messageID;
  await dbRequest.getRequestData(messageId);

  await dbRequest.acceptRequest(messageId, "Active");
  res.send({ status: 200, message: "Request was accepted successfully." });
});

router.post("/changeRequestStatus", async function (req, res) {
  const messageId = req.body.messageID;
  const requestStatus = req.body.requestStatus;
  const studentName = req.body.studentName;
  await dbRequest.requestStatusUpdate(messageId, requestStatus);
  let msg;
  let status;
  if (requestStatus == "Active") {
    msg = "Request was accepted successfully";
    status = "accepted";
  } else if (requestStatus == "Rejected") {
    msg = "Request was rejected successfully";
    status = "rejected";
  } else if (requestStatus == "Archived") {
    msg = "Request was archived successfully";
    status = "ended up";
  }

  //Sending notification to mentee with email and sms
  if (requestStatus == "Active" || requestStatus == "Rejected") {
    const requestDetails = await dbRequest.getRequestData(messageId);
    const parent = await db.getUser(requestDetails.parentUID);
    const mentor = await db.getUser(requestDetails.mentorUID);
    await sentParentARequestReplyEmail(
      mentor.name,
      parent.name,
      studentName,
      req,
      parent.email
    );
    await textParentRequest(mentor, parent, studentName, status);
  } else if (requestStatus == "Archived") {
    const requestDetails = await dbRequest.getRequestData(messageId);
    const parent = await db.getUser(requestDetails.parentUID);
    const mentor = await db.getUser(requestDetails.mentorUID);
    await sentMentorARequestReplyEmail(
      mentor.name,
      parent.name,
      studentName,
      req,
      mentor.email
    );
    await textMentorReplyRequest(mentor, parent, studentName, req);
  }

  res.send({ status: 200, message: msg });
});

router.post("/updateSessionHours", async function (req, res) {
  const messageId = req.body.messageID;
  const sessionHours = req.body.sessionHours;
  const studentName = req.body.studentName;
  dbRequest
    .updateSessionHours(messageId, sessionHours, studentName)
    .then(() => {
      res.send({
        status: 200,
        message: "Session hours was updated successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post("/updateRatings", async function (req, res) {
  const messageId = req.body.messageID;
  const sessionHours = req.body.ratings;
  const studentName = req.body.studentName;
  dbRequest
    .updateMentorRatings(messageId, sessionHours, studentName)
    .then(() => {
      res.send({ status: 200, message: "Request was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
});

module.exports = router;
