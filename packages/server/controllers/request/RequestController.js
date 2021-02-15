const usersDB = require("../../db/users");

class RequestController {
  /**
   * Sends a mentorship request to a  mentor for a student from a parent
   * @param {String} parentId
   * @param {String} studentId
   * @param {String} mentorId
   * @param {String} message
   */
  async sendRequestToMentor(parentId, mentorId, studentName, message) {
    const mentor = await usersDB.getUser(mentorId);
    const parent = await usersDB.getUser(parentId);
    const student = this.findStudentFromParent(parent, studentName);
    const request = this.createMentorshipRequest(student);

    await usersDB.addMessageToDB(mentor.uid, parent.uid, student, message);
  }

  findStudentFromParent(parent, studentName) {
    // TODO(johancc) - Speed up query by getting the student from id
    let candidates = parent.students.filter(
      (student) => student.name === studentName
    );
    if (candidates.length === 0) {
      throw new Error(`Unable to retrive student ${studentName}`);
    }
    const student = candidates[0];
    return student;
  }

  createMentorshipRequest(student) {
    return {
      name: student.name,
      email: student.email,
      sessionHours: 0,
      createdDate: new Date(),
    };
  }
}

module.exports = RequestController();
