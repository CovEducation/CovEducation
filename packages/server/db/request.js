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

const getParentsRequest = async (id) => {
    var temp = [];
    const requestDocs = await db.collection('requests').where("parentUID", "==", id)
        .get()
        .then(function(querySnapshot) {
            //console.log("querySnapshot", querySnapshot);
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.data());
                temp.push({
                    "messageId": doc.id,
                    "messageObj": doc.data()
                });
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

const requestStatusUpdate = async (messageId, status, studentName) => {
    const requestDoc = await getDoc('requests', messageId);
    var studentArray = [];
    if(typeof requestDoc.students !== "undefined")
    {
        studentArray = requestDoc.students;
    }
    if(studentArray.length > 0)
    {
        var finalStudentArray = [];
        for(var i = 0; i < studentArray.length; i++)
        {
            var rec = studentArray[i];
            if(rec.name == studentName)
            {
                rec["requestStatus"] = status;
                if(status == "Active")
                {
                    rec["acceptedDate"] = new Date();
                }
                else if(status == "Archived")
                {
                    rec["archivedDate"] = new Date();
                }
                else if(status == "Rejected")
                {
                    rec["rejectedDate"] = new Date();
                }
            }
            finalStudentArray.push(rec);
        }
        return messageCollectionRef.doc(messageId).update({
            students: finalStudentArray
        });
    }
    else
    {
        if(status == "Active")
        {
            return messageCollectionRef.doc(messageId).update({
                requestStatus: status,
                acceptedDate: new Date()
            });
        }
        else if(status == "Archived")
        {
            return messageCollectionRef.doc(messageId).update({
                requestStatus: status,
                archivedDate: new Date()
            });
        }
        else if(status == "Rejected")
        {
            return messageCollectionRef.doc(messageId).update({
                requestStatus: status,
                rejectedDate: new Date()
            });
        }
    }
};

const updateSessionHours = async (messageId, sessionHours, studentName) => {
    const requestDoc = await getDoc('requests', messageId);
    var studentArray = [];
    if(typeof requestDoc.students !== "undefined")
    {
        studentArray = requestDoc.students;
    }
    if(studentArray.length > 0)
    {
        var finalStudentArray = [];
        for(var i = 0; i < studentArray.length; i++)
        {
            var rec = studentArray[i];
            if(rec.name == studentName)
            {
                if(typeof rec.sessionHours == "undefined")
                {
                    var lastSessionHours = 0;
                }
                else {
                    var lastSessionHours = rec.sessionHours;
                }
                sessionHours = parseInt(sessionHours) + parseInt(lastSessionHours);
                rec["sessionHours"] = sessionHours;
                rec["sessionDate"] = new Date();
            }
            finalStudentArray.push(rec);
        }
        return messageCollectionRef.doc(messageId).update({
            students: finalStudentArray
        });
    }
};

const updateMentorRatings = async (messageId, ratings, studentName) => {
    const requestDoc = await getDoc('requests', messageId);
    var studentArray = [];
    if(typeof requestDoc.students !== "undefined")
    {
        studentArray = requestDoc.students;
    }
    if(studentArray.length > 0)
    {
        var finalStudentArray = [];
        for(var i = 0; i < studentArray.length; i++)
        {
            var rec = studentArray[i];
            if(rec.name == studentName)
            {
                rec["ratings"] = ratings;
                rec["ratingsDate"] = new Date();
            }
            finalStudentArray.push(rec);
        }

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
            students: finalStudentArray
        });
    }
};


module.exports = { getRequestData, getParentsRequest, acceptRequest, requestStatusUpdate, updateSessionHours, updateMentorRatings };