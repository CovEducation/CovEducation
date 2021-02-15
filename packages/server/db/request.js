const firebase = require("firebase-admin");
const db = firebase.firestore();

const messageCollectionRef = db.collection("requests");
const mentorsCollectionRef = db.collection("mentors");

const getDoc = async (collection, uid) => {
  const obj = await db.collection(collection).doc(uid).get();
  if (obj.exists) {
    return obj.data();
  } else {
    return "";
  }
};

const getRequestData = async (id) => {
  const requestDoc = await getDoc("requests", id);
  return requestDoc;
};

const getRequestByMentor = async (id) => {
  const temp = [];
  return await db
    .collection("requests")
    .where("mentorUID", "==", id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const d = doc.data();
        if (d.requestStatus !== undefined) {
          temp.push({
            messageId: doc.id,
            messageObj: doc.data(),
          });
        }
      });
      return temp;
    });
};

const getParentsRequest = async (id) => {
  return await db
    .collection("requests")
    .where("parentUID", "==", id)
    .get()
    .then(function (querySnapshot) {
      const temp = [];
      querySnapshot.forEach(function (doc) {
        //doc.data()
        const d = doc.data();
        if (typeof d.requestStatus !== "undefined") {
          temp.push({
            messageId: doc.id,
            messageObj: doc.data(),
          });
        }
      });
      return temp;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

const acceptRequest = async (mentorId, messageId) => {
  return mentorsCollectionRef.doc(mentorId).update({
    accepted: firebase.firestore.FieldValue.arrayUnion(messageId),
  });
};

const requestStatusUpdate = async (messageId, status) => {
  const requestDoc = await getDoc("requests", messageId);
  let obj;
  if (status == "Active") {
    obj = {
      requestStatus: status,
      acceptedDate: new Date().toISOString(),
    };
  } else if (status == "Archived") {
    obj = {
      requestStatus: status,
      archivedDate: new Date().toISOString(),
    };
  } else if (status == "Rejected") {
    obj = {
      requestStatus: status,
      rejectedDate: new Date().toISOString(),
    };
  }
  return messageCollectionRef.doc(messageId).update(obj);
};

const updateSessionHours = async (messageId, sessionHours, studentName) => {
  const requestDoc = await getDoc("requests", messageId);
  if (typeof requestDoc.sessionHours == "undefined") {
    const lastSessionHours = 0;
  } else {
    const lastSessionHours = requestDoc.sessionHours;
  }
  sessionHours = parseInt(sessionHours) + parseInt(lastSessionHours);
  return messageCollectionRef.doc(messageId).update({
    sessionHours: sessionHours,
    sessionDate: new Date().toISOString(),
  });
};

const updateMentorRatings = async (messageId, ratings, studentName) => {
  const requestDoc = await getDoc("requests", messageId);
  rec = requestDoc;
  const mentorUID = requestDoc.mentorUID;
  const mentorDetails = await getDoc("mentors", mentorUID);
  const noOfRatings = 0;
  if (typeof mentorDetails.noOfRatings !== "undefined") {
    noOfRatings = parseInt(mentorDetails.noOfRatings);
  }
  const oldAvgRatings = 0;
  if (typeof mentorDetails.avgRatings !== "undefined") {
    oldAvgRatings = parseFloat(mentorDetails.avgRatings);
  }
  const runningAverageRatings =
    (parseFloat(noOfRatings * oldAvgRatings) + parseFloat(ratings)) /
    (noOfRatings + 1);
  const newNoOfRatings = noOfRatings + 1;

  const updateMentor = await mentorsCollectionRef.doc(mentorUID).update({
    noOfRatings: newNoOfRatings,
    avgRatings: runningAverageRatings,
  });
  return messageCollectionRef.doc(messageId).update({
    ratings: ratings,
    ratingsDate: new Date().toISOString(),
  });
};

module.exports = {
  getRequestData,
  getParentsRequest,
  acceptRequest,
  requestStatusUpdate,
  updateSessionHours,
  updateMentorRatings,
  getRequestByMentor,
};
