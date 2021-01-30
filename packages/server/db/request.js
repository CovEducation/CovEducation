const firebase = require('firebase-admin');
const Schemas = require('./schemas');
const db = firebase.firestore();

const messageCollectionRef = db.collection('requests');
const mentorsCollectionRef = db.collection('mentors');
const MENTOR = 'MENTOR';
const PARENT = 'PARENT';

const getDoc = async (collection, uid) => {
    const obj = await db.collection(collection).doc(uid).get();
    if (obj.exists) {
        return obj.data();
    }
    else {
        return "";
    }
    //throw new Error(`Unable to find '${uid}' in '${collection}' collection`);
};

const getRequestData = async (id) => {
    const requestDoc = await getDoc('requests', id);
    return requestDoc;
};

const getRequestByMentor = async (id) => {
    var temp = [];
    //return messageCollectionRef.where("parentUID", "==", id).get();
    const requestDocs = await db.collection('requests').where("mentorUID", "==", id)
        .get()
        .then(function(querySnapshot) {
            //console.log("querySnapshot", querySnapshot);
            querySnapshot.forEach(function(doc) {
                //doc.data()
                var d = doc.data();
                if(typeof d.requestStatus !== "undefined")
                {
                    temp.push({
                        "messageId": doc.id,
                        "messageObj": doc.data()
                    });
                }
                // temp.push({
                //     "messageId": doc.id,
                //     "messageObj": doc.data()
                // });
            });
            return temp;
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    return requestDocs;
};

const getParentsRequest = async (id) => {
    var temp = [];
    //return messageCollectionRef.where("parentUID", "==", id).get();
    const requestDocs = await db.collection('requests').where("parentUID", "==", id)
        .get()
        .then(function(querySnapshot) {
            //console.log("querySnapshot", querySnapshot);
            querySnapshot.forEach(function(doc) {
                //doc.data()
                var d = doc.data();
                if(typeof d.requestStatus !== "undefined")
                {
                    temp.push({
                        "messageId": doc.id,
                        "messageObj": doc.data()
                    });
                }
                // temp.push({
                //     "messageId": doc.id,
                //     "messageObj": doc.data()
                // });
            });
            return temp;
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    return requestDocs;
};

const acceptRequest = async (mentorId, messageId) => {
    return mentorsCollectionRef.doc(mentorId).update({
        accepted: firebase.firestore.FieldValue.arrayUnion(messageId),
    });
};

const requestStatusUpdate = async (messageId, status) => {
    const requestDoc = await getDoc('requests', messageId);
    var obj;
    if(status == "Active")
    {
        obj = {
            requestStatus: status,
            acceptedDate: new Date().toISOString()
        }
    }
    else if(status == "Archived")
    {
        obj = {
            requestStatus: status,
            archivedDate: new Date().toISOString()
        }
    }
    else if(status == "Rejected")
    {
        obj = {
            requestStatus: status,
            rejectedDate: new Date().toISOString()
        }
    }
    return messageCollectionRef.doc(messageId).update(obj);
};

const updateSessionHours = async (messageId, sessionHours, studentName) => {
    const requestDoc = await getDoc('requests', messageId);
    if(typeof requestDoc.sessionHours == "undefined")
    {
        var lastSessionHours = 0;
    }
    else {
        var lastSessionHours = requestDoc.sessionHours;
    }
    sessionHours = parseInt(sessionHours) + parseInt(lastSessionHours);
    return messageCollectionRef.doc(messageId).update({
        sessionHours: sessionHours,
        sessionDate: new Date().toISOString()
    });
};

const updateMentorRatings = async (messageId, ratings, studentName) => {
    const requestDoc = await getDoc('requests', messageId);
    rec = requestDoc;
    var mentorUID = requestDoc.mentorUID;
    const mentorDetails = await getDoc('mentors', mentorUID);
    var noOfRatings = 0;
    if(typeof mentorDetails.noOfRatings !== "undefined")
    {
        noOfRatings = parseInt(mentorDetails.noOfRatings);
    }
    var oldAvgRatings = 0;
    if(typeof mentorDetails.avgRatings !== "undefined")
    {
        oldAvgRatings = parseFloat(mentorDetails.avgRatings);
    }
    var runningAverageRatings = (parseFloat(noOfRatings * oldAvgRatings) + parseFloat(ratings))/(noOfRatings + 1);
    var newNoOfRatings = noOfRatings + 1;

    var updateMentor = await mentorsCollectionRef.doc(mentorUID).update({
        noOfRatings: newNoOfRatings,
        avgRatings: runningAverageRatings
    });
    return messageCollectionRef.doc(messageId).update({
        ratings: ratings,
        ratingsDate: new Date().toISOString()
    });
};


module.exports = { getRequestData, getParentsRequest, acceptRequest, requestStatusUpdate, updateSessionHours, updateMentorRatings, getRequestByMentor };