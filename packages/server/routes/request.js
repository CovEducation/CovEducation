const firebase = require('firebase-admin');
const express = require('express');
const authMiddleware = require('../middleware/auth');
const db = require('../db/users');
const dbRequest = require('../db/request');
const {
    textMentorRequest,
    textGuardianConfirmation,
    emailMentorRequest,
    emailGuardianConfirmation,
    sentParentARequestReplyEmail,
    sentMentorARequestReplyEmail,
    textParentRequest,
    textMentorReplyRequest
  } = require('../messaging');
const { parentSchema } = require('../db/schemas');
var router = express.Router();
const NOTIFICATION_PREFERENCES = {
    SMS: 'PHONE',
    EMAIL: 'EMAIL',
};
router.post("/sendRequest", async function(req, res, next) {
    const user = await db.getUserByEmail(req.body.mentorEmailAddress);
    

    const { message,parentId,studentID,studentName } = req.body;
    //const parentUID = req.user.uid;

    const mentor = await db.getUser(user.uid);
    const parent = await db.getUser(parentId);
    // console.log("mentor", mentor);
    // if(typeof parent.students !== "undefined")
    // {
    //     var studentsArray = parent.students;
    // }
    // else {
    //     var studentsArray = [];
    // }
    // var studentsName = [];
    // if(studentsArray.length > 0)
    // {
    //     for(var i = 0; i < studentsArray.length; i++)
    //     {
    //         var studentRecord = studentsArray[i];
    //         if(typeof studentRecord.name !== "undefined")
    //         {
    //             studentsName.push({
    //                 "name": studentRecord.name,
    //                 "sessionHours": 0,
    //                 "requestStatus": "Pending",
    //                 "createdDate": new Date()
    //             });
    //         }
    //         else {
    //             studentsName.push({
    //                 "name": studentRecord.email,
    //                 "sessionHours": 0,
    //                 "requestStatus": "Pending",
    //                 "createdDate": new Date()
    //             });
    //         }
    //     }
    // }
    // We want to keep logs of all messages on Firestore.
    const a = await db.addMessageToDB(user.uid, parentId, studentID,studentName, message);

    // Default to email if preference not specify
    const mentorPreference = mentor.notificationPreference || NOTIFICATION_PREFERENCES.EMAIL;
    if (mentorPreference.toUpperCase() === NOTIFICATION_PREFERENCES.EMAIL) {
        emailMentorRequest(mentor, parent, studentName, message)
        .then(emailGuardianConfirmation(mentor, parent, studentName))
        .then(() => res.send({status:200}));
    } else if (mentorPreference.toUpperCase() === NOTIFICATION_PREFERENCES.SMS) {
        // Use Twilio.
        textMentorRequest(mentor, parent, studentName, message)
        .then(textGuardianConfirmation(mentor, parent, studentName))
        .then(() => res.send({status:200}));
    } else {
        res.sendStatus(400);
    }
});

router.post("/getRequests", async function(req, res, next) {
    var id = req.body.id;
    const requesterDetails = await db.getUser(id);    
    var requesterRole = requesterDetails.role;
    if(requesterRole == "MENTOR") {
        var requestsCollection = [];

        var requestCollection = await dbRequest.getRequestByMentor(id);
        if(requestCollection.length > 0)
        {
            var finalOutput = [];
            for(var requestRow = 0; requestRow < requestCollection.length; requestRow++)
            {
                var requestRecord = requestCollection[requestRow].messageObj;
                var mentorDetails = await db.getUser(requestRecord.mentorUID);
                var messageId = requestCollection[requestRow].messageId;
                var obj = {
                    "messageId": messageId,
                    "parentDetails": requesterDetails,
                    "mentorDetails": mentorDetails,
                    "studentDetails": {
                        "name": requestRecord.studentName,
                        "studentUID": requestRecord.studentUID
                    },
                    "requestDetails": requestRecord,
                    "requestStatus": requestRecord.requestStatus,
                    "requestedDate": requestRecord.createdDate,
                    "acceptedDate": requestRecord.requestStatus == "Active"?requestRecord.acceptedDate:"",
                    "archivedDate": requestRecord.requestStatus == "Archived"?requestRecord.archivedDate:"",
                    "rejectedDate": requestRecord.requestStatus == "Rejected"?requestRecord.rejectedDate:""
                };
                finalOutput.push(obj);
                // var accepted = [];
                // if(typeof mentorDetails.accepted !== "undefined")
                // {
                //     requests = mentorDetails.accepted;
                // }
                // var obj = {
                //     "message": requestRecord.message,
                //     "parentDetails": requesterDetails,
                //     "mentorDetails": mentorDetails,
                //     "studentDetails": requesterDetails,
                //     "accepted": (requests.indexOf(messageId) > -1)?true:false,
                //     //"accepted": (accepted.indexOf(messageId) > -1)?true:false,
                //     "messageId": messageId
                // };
                // finalOutput.push(obj);
                // if(typeof requesterDetails.students !== "undefined")
                // {
                //     if(requesterDetails.students.length > 0)
                //     {
                //         for(var j = 0; j < requesterDetails.students.length; j++)
                //         {
                //             var obj = {
                //                 "messageId": messageId,
                //                 "parentDetails": requesterDetails,
                //                 "mentorDetails": mentorDetails,
                //                 "studentDetails": {
                //                     "email": requesterDetails.students[j] && requesterDetails.students[j].email,
                //                     "name": requesterDetails.students[j] && requesterDetails.students[j].name,
                //                     "sessionHours": requesterDetails.students[j] && requestRecord.students[j].sessionHours,
                //                     "ratings": (typeof requestRecord.students[j] && requestRecord.students[j].ratings !== "undefined")? (requestRecord.students[j] && requestRecord.students[j].ratings ):0
                //                 },
                //                 "requestDetails": requestRecord,
                //                 "requestStatus": requestRecord.students[j].requestStatus,
                //                 "requestedDate": requestRecord.students[j].createdDate,
                //                 "acceptedDate": requestRecord.students[j].requestStatus == "Active"?requestRecord.students[j].acceptedDate:"",
                //                 "archivedDate": requestRecord.students[j].requestStatus == "Archived"?requestRecord.students[j].archivedDate:"",
                //                 "rejectedDate": requestRecord.students[j].requestStatus == "Rejected"?requestRecord.students[j].rejectedDate:""
                //             };
                //             finalOutput.push(obj);
                //         }
                //     }
                // }
                // else {
                //     var obj = {
                //         "messageId": messageId,
                //         "requestDetails": requestRecord,
                //         "mentorDetails": mentorDetails,
                //         "parentDetails": requesterDetails,
                //         "studentDetails": []
                //     };
                //     finalOutput.push(obj);
                // }
            }
            res.send({status:200,result:finalOutput,message:"Requests found."});
        }
        else {
            res.send({status:200,result:[],message:"No Requests Yet."});
        }
    }
    else {
        var requestCollection = await dbRequest.getParentsRequest(id);
        if(requestCollection.length > 0)
        {
            var finalOutput = [];
            for(var requestRow = 0; requestRow < requestCollection.length; requestRow++)
            {
                var requestRecord = requestCollection[requestRow].messageObj;
                var mentorDetails = await db.getUser(requestRecord.mentorUID);
                var messageId = requestCollection[requestRow].messageId;
                var obj = {
                    "messageId": messageId,
                    "parentDetails": requesterDetails,
                    "mentorDetails": mentorDetails,
                    "studentDetails": {
                        "name": requestRecord.studentName,
                        "studentUID": requestRecord.studentUID
                    },
                    "requestDetails": requestRecord,
                    "requestStatus": requestRecord.requestStatus,
                    "requestedDate": requestRecord.createdDate,
                    "acceptedDate": requestRecord.requestStatus == "Active"?requestRecord.acceptedDate:"",
                    "archivedDate": requestRecord.requestStatus == "Archived"?requestRecord.archivedDate:"",
                    "rejectedDate": requestRecord.requestStatus == "Rejected"?requestRecord.rejectedDate:""
                };
                finalOutput.push(obj);
                // var accepted = [];
                // if(typeof mentorDetails.accepted !== "undefined")
                // {
                //     requests = mentorDetails.accepted;
                // }
                // var obj = {
                //     "message": requestRecord.message,
                //     "parentDetails": requesterDetails,
                //     "mentorDetails": mentorDetails,
                //     "studentDetails": requesterDetails,
                //     "accepted": (requests.indexOf(messageId) > -1)?true:false,
                //     //"accepted": (accepted.indexOf(messageId) > -1)?true:false,
                //     "messageId": messageId
                // };
                // finalOutput.push(obj);
                // if(typeof requesterDetails.students !== "undefined")
                // {
                //     if(requesterDetails.students.length > 0)
                //     {
                //         for(var j = 0; j < requesterDetails.students.length; j++)
                //         {
                //             var obj = {
                //                 "messageId": messageId,
                //                 "parentDetails": requesterDetails,
                //                 "mentorDetails": mentorDetails,
                //                 "studentDetails": {
                //                     "email": requesterDetails.students[j] && requesterDetails.students[j].email,
                //                     "name": requesterDetails.students[j] && requesterDetails.students[j].name,
                //                     "sessionHours": requesterDetails.students[j] && requestRecord.students[j].sessionHours,
                //                     "ratings": (typeof requestRecord.students[j] && requestRecord.students[j].ratings !== "undefined")? (requestRecord.students[j] && requestRecord.students[j].ratings ):0
                //                 },
                //                 "requestDetails": requestRecord,
                //                 "requestStatus": requestRecord.students[j].requestStatus,
                //                 "requestedDate": requestRecord.students[j].createdDate,
                //                 "acceptedDate": requestRecord.students[j].requestStatus == "Active"?requestRecord.students[j].acceptedDate:"",
                //                 "archivedDate": requestRecord.students[j].requestStatus == "Archived"?requestRecord.students[j].archivedDate:"",
                //                 "rejectedDate": requestRecord.students[j].requestStatus == "Rejected"?requestRecord.students[j].rejectedDate:""
                //             };
                //             finalOutput.push(obj);
                //         }
                //     }
                // }
                // else {
                //     var obj = {
                //         "messageId": messageId,
                //         "requestDetails": requestRecord,
                //         "mentorDetails": mentorDetails,
                //         "parentDetails": requesterDetails,
                //         "studentDetails": []
                //     };
                //     finalOutput.push(obj);
                // }
            }
            res.send({status:200,result:finalOutput,message:"Requests found."});
        }
        else {
            res.send({status:200,result:[],message:"No Requests Yet."});
        }
    }
});

router.post("/acceptRequest", async function(req, res, next) {
    var mentorId = req.body.mentorUID;
    var messageId = req.body.messageID;
    var acceptReq = await dbRequest.acceptRequest(messageId, "Active");
    res.send({status:200, message: "Request was accepted successfully."});
});

router.post("/changeRequestStatus", async function(req, res, next) {
    var messageId = req.body.messageID;
    var requestStatus = req.body.requestStatus;
    var studentName = req.body.studentName;
    var acceptReq = await dbRequest.requestStatusUpdate(messageId, requestStatus);
    if(requestStatus == "Active")
    {
        var msg = "Request was accepted successfully";
        var req = "accepted";
    }
    else if(requestStatus == "Rejected")
    {
        var msg = "Request was rejected successfully";
        var req = "rejected";
    }
    else if(requestStatus == "Archived")
    {
        var msg = "Request was archived successfully";
        var req = "ended up"
    }

    //Sending notification to mentee with email and sms
    if(requestStatus == "Active" || requestStatus == "Rejected")
    {
        var requestDetails = await dbRequest.getRequestData(messageId);
        var parent = await db.getUser(requestDetails.parentUID);
        var mentor = await db.getUser(requestDetails.mentorUID);
        sentParentARequestReplyEmail(mentor.name, parent.name, studentName, req, parent.email);
        textParentRequest(mentor,parent,studentName,req);
    }
    else if (requestStatus == "Archived")
    {
        var requestDetails = await dbRequest.getRequestData(messageId);
        var parent = await db.getUser(requestDetails.parentUID);
        var mentor = await db.getUser(requestDetails.mentorUID);
        sentMentorARequestReplyEmail(mentor.name, parent.name, studentName, req, mentor.email);
        textMentorReplyRequest(mentor,parent,studentName,req);
    }

    res.send({status:200, message: msg});
});

router.post("/updateSessionHours", async function(req, res, next) {
    var messageId = req.body.messageID;
    var sessionHours = req.body.sessionHours;
    var studentName = req.body.studentName;
    var acceptReq = await dbRequest.updateSessionHours(messageId, sessionHours, studentName);
    res.send({status:200, message: "Session hours was updated successfully."});
});

router.post("/updateRatings", async function(req, res, next) {
    var messageId = req.body.messageID;
    var sessionHours = req.body.ratings;
    var studentName = req.body.studentName;
    var acceptReq = await dbRequest.updateMentorRatings(messageId, sessionHours, studentName);
    res.send({status:200, message: "Request was updated successfully."});
});

module.exports = router;