const express = require("express");
const db = require("../db/users");
const dbRequest = require("../db/request");
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
  SMS: "SMS",
  EMAIL: "EMAIL",
};
router.post("/sendRequest", async (req, res) => {
  const user = await db.getUserByEmail(req.body.mentorEmailAddress);
  const { message } = req.body;
  const mentor = await db.getUser(user.uid);
  const parent = await db.getUser(req.body.parentId);
  const students = parent.students || [];
  const studentRequests = students.map((student) => {
    return {
      name: student.name || student.email,
      sessionHours: 0,
      requestStatus: "Pending",
      createdDate: new Date(),
    };
  });

  // We want to keep logs of all messages on Firestore.
  await db.addMessageToDB(user.uid, req.body.parentId, studentsName, message);

  // Default to email if preference not specify
  const mentorPreference =
    mentor.communicationPref || NOTIFICATION_PREFERENCES.EMAIL;
  if (mentorPreference === NOTIFICATION_PREFERENCES.EMAIL) {
    emailMentorRequest(mentor, parent, studentRequests, message)
      .then(emailGuardianConfirmation(mentor, parent, studentRequests))
      .then(() => res.send({ status: 200 }));
  } else if (mentorPreference === NOTIFICATION_PREFERENCES.SMS) {
    // Use Twilio.
    textMentorRequest(mentor, parent, studentRequests, message)
      .then(textGuardianConfirmation(mentor, parent, studentRequests))
      .then(() => res.send({ status: 200 }));
  } else {
    res
      .sendStatus(400)
      .send({ err: `Invalid communication preference: ${mentorPreference}` });
  }
});

router.post("/getRequests", async (req, res) => {
  const id = req.body.id;
  const requesterDetails = await db.getUser(id);
  const requesterRole = requesterDetails.role;
  if (requesterRole === "MENTOR") {
    const response = handleGetRequestsMentor(requesterDetails);
    res.send(response);
  } else {
    const response = handleGetRequestsParent(requesterDetails, id);
    res.send(response);
  }
});

const handleGetRequestsMentor = async (requesterDetails) => {
  const requestsCollection = [];
  if (typeof requesterDetails.requests !== "undefined") {
    requestsCollection = requesterDetails.requests;
  }
  if (requestsCollection.length > 0) {
    const finalOutput = [];
    for (
      const requestRow = 0;
      requestRow < requestsCollection.length;
      requestRow++
    ) {
      const requestId = requestsCollection[requestRow];
      const requestDetails = await dbRequest.getRequestData(requestId);
      if (requestDetails) {
        const mentorDetails = requesterDetails;
        const parentDetails = await db.getUser(requestDetails.parentUID);
        if (typeof parentDetails.students !== "undefined") {
          if (parentDetails.students.length > 0) {
            for (const j = 0; j < parentDetails.students.length; j++) {
              const obj = {
                messageId: requestId,
                parentDetails: parentDetails,
                mentorDetails: mentorDetails,
                studentDetails: {
                  email: parentDetails.students[j].email,
                  name: parentDetails.students[j].name,
                  sessionHours: requestDetails.students[j].sessionHours,
                  ratings:
                    typeof requestDetails.students[j].ratings !== "undefined"
                      ? requestDetails.students[j].ratings
                      : 0,
                },
                requestDetails: requestDetails,
                requestStatus: requestDetails.students[j].requestStatus,
                requestedDate: requestDetails.students[j].createdDate,
                acceptedDate:
                  requestDetails.students[j].requestStatus == "Active"
                    ? requestDetails.students[j].acceptedDate
                    : "",
                archivedDate:
                  requestDetails.students[j].requestStatus == "Archived"
                    ? requestDetails.students[j].archivedDate
                    : "",
                rejectedDate:
                  requestDetails.students[j].requestStatus == "Rejected"
                    ? requestDetails.students[j].rejectedDate
                    : "",
              };
              finalOutput.push(obj);
            }
          }
        } else {
          const obj = {
            messageId: requestId,
            requestDetails: requestDetails,
            mentorDetails: mentorDetails,
            parentDetails: parentDetails,
            studentDetails: [],
          };
          finalOutput.push(obj);
        }
      }
    }
    return {
      status: 200,
      result: finalOutput,
      message: "Requests found.",
    };
  } else {
    return { status: 200, result: [], message: "No Requests Yet." };
  }
};

const handleGetRequestsParent = async (requesterDetails, id) => {
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
      if (typeof requesterDetails.students !== "undefined") {
        if (requesterDetails.students.length > 0) {
          for (const j = 0; j < requesterDetails.students.length; j++) {
            const obj = {
              messageId: messageId,
              parentDetails: requesterDetails,
              mentorDetails: mentorDetails,
              studentDetails: {
                email: requesterDetails.students[j].email,
                name: requesterDetails.students[j].name,
                sessionHours: requestRecord.students[j].sessionHours,
                ratings:
                  typeof requestRecord.students[j].ratings !== "undefined"
                    ? requestRecord.students[j].ratings
                    : 0,
              },
              requestDetails: requestRecord,
              requestStatus: requestRecord.students[j].requestStatus,
              requestedDate: requestRecord.students[j].createdDate,
              acceptedDate:
                requestRecord.students[j].requestStatus == "Active"
                  ? requestRecord.students[j].acceptedDate
                  : "",
              archivedDate:
                requestRecord.students[j].requestStatus == "Archived"
                  ? requestRecord.students[j].archivedDate
                  : "",
              rejectedDate:
                requestRecord.students[j].requestStatus == "Rejected"
                  ? requestRecord.students[j].rejectedDate
                  : "",
            };
            finalOutput.push(obj);
          }
        }
      } else {
        const obj = {
          messageId: messageId,
          requestDetails: requestRecord,
          mentorDetails: mentorDetails,
          parentDetails: requesterDetails,
          studentDetails: [],
        };
        finalOutput.push(obj);
      }
    }
    return {
      status: 200,
      result: finalOutput,
      message: "Requests found.",
    };
  } else {
    return { status: 200, result: [], message: "No Requests Yet." };
  }
};

router.post("/acceptRequest", async function (req, res) {
  const messageId = req.body.messageID;
  await dbRequest.acceptRequest(messageId, "Active");
  res.send({ status: 200, message: "Request was accepted successfully." });
});

router.post("/changeRequestStatus", async function (req, res) {
  const messageId = req.body.messageID;
  const requestStatus = req.body.requestStatus;
  const studentName = req.body.studentName;
  await dbRequest.requestStatusUpdate(messageId, requestStatus, studentName);

  let msg = "";
  let status = "";

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
    sentParentARequestReplyEmail(
      mentor.name,
      parent.name,
      studentName,
      req,
      parent.email
    );
    textParentRequest(mentor, parent, studentName, status);
  } else if (requestStatus == "Archived") {
    const requestDetails = await dbRequest.getRequestData(messageId);
    const parent = await db.getUser(requestDetails.parentUID);
    const mentor = await db.getUser(requestDetails.mentorUID);
    sentMentorARequestReplyEmail(
      mentor.name,
      parent.name,
      studentName,
      req,
      mentor.email
    );
    textMentorReplyRequest(mentor, parent, studentName, status);
  }

  res.send({ status: 200, message: msg });
});

router.post("/updateSessionHours", async (req, res) => {
  const messageId = req.body.messageID;
  const sessionHours = req.body.sessionHours;
  const studentName = req.body.studentName;
  await dbRequest.updateSessionHours(messageId, sessionHours, studentName);
  res.send({ status: 200, message: "Session hours was updated successfully." });
});

router.post("/updateRatings", async function (req, res) {
  const messageId = req.body.messageID;
  const sessionHours = req.body.ratings;
  const studentName = req.body.studentName;
  await dbRequest.updateMentorRatings(messageId, sessionHours, studentName);
  res.send({ status: 200, message: "Request was updated successfully." });
});

module.exports = router;
