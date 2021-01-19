const firebase = require("firebase-admin");
const db = firebase.firestore();

const messageCollectionRef = db.collection("requests");
const mentorsCollectionRef = db.collection("mentors");

const getDoc = async (collection, uid) => {
  const obj = await db.collection(collection).doc(uid).get();
  if (obj.exists) {
    return obj.data();
  } else {
    throw new Error(`Unable to find '${uid}' in '${collection}' collection`);
  }
};

const getRequestData = (id) => getDoc("requests", id);

const getParentsRequest = (id) => {
  return db
    .collection("requests")
    .where("parentUID", "==", id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.map((doc) => {
        // doc.data() is never undefined for query doc snapshots
        return {
          messageId: doc.id,
          messageObj: doc.data(),
        };
      });
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

const requestStatusUpdate = async (messageId, status, studentName) => {
  const requestDoc = await getDoc("requests", messageId);
  const students = requestDoc.students || [];
  const updatedStudents = students
    .filter((student) => student.name === studentName)
    .map((student) => {
      student.requestStatus = status;
      if (status === "Active") {
        student.acceptedDate = new Date();
      } else if (status === "Archived") {
        student.archivedDate = new Date();
      } else if (status === "Rejected") {
        student.rejectedDate = new Date();
      } else {
        throw new Error(`Invalid status ${status}`);
      }
      return {
        requestStatus: status,
        ...student,
      };
    });
  if (updatedStudents.length > 0) {
    return messageCollectionRef.doc(messageId).update({
      students: updatedStudents,
    });
  } else {
    if (status == "Active") {
      return messageCollectionRef.doc(messageId).update({
        requestStatus: status,
        acceptedDate: new Date(),
      });
    } else if (status == "Archived") {
      return messageCollectionRef.doc(messageId).update({
        requestStatus: status,
        archivedDate: new Date(),
      });
    } else if (status == "Rejected") {
      return messageCollectionRef.doc(messageId).update({
        requestStatus: status,
        rejectedDate: new Date(),
      });
    }
  }
};

const updateSessionHours = async (messageId, sessionHours, studentName) => {
  const requestDoc = await getDoc("requests", messageId);
  const studentArray = requestDoc.students || [];
  const updatedStudents = studentArray
    .filter((student) => student.name === studentName)
    .map((student) => {
      student.sessionHours = sessionHours + (student.sessionHours || 0);
      student.sessionDate = new Date();
    });
  return messageCollectionRef.doc(messageId).update({
    students: updatedStudents,
  });
};

const updateMentorRatings = async (messageId, ratings, studentName) => {
  const requestDoc = await getDoc("requests", messageId);
  if (!requestDoc.students) {
    throw new Error(`Trying to update nonexistent rating: ${messsageId}`);
  }
  const updatedStudentReviews = requestDoc.students.map((student) => {
    if (student.name === studentName) {
      student.ratings = ratings;
      student.ratingsDate = new Date();
    }
  });
  await messageCollectionRef.doc(messageId).update({
    students: updatedStudentReviews,
  });
  const mentorUID = requestDoc.mentorUID;
  const mentorDetails = await getDoc("mentors", mentorUID);
  const { noOfRatings = 0, oldAvgRatings = 0 } = mentorDetails;
  const newAvg = noOfRatings * oldAvgRatings + ratings / (noOfRatings + 1);
  const newCount = noOfRatings + 1;

  await mentorsCollectionRef.doc(mentorUID).update({
    noOfRatings: newCount,
    avgRatings: newAvg,
  });
};

module.exports = {
  getRequestData,
  getParentsRequest,
  acceptRequest,
  requestStatusUpdate,
  updateSessionHours,
  updateMentorRatings,
};
