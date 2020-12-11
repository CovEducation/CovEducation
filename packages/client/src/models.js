export const createMentorModel = (mentorData) => ({
    name: mentorData.mentorName,
    email: mentorData.mentorEmail,
    gradeLevels: mentorData.selectedGradeLevels,
    subjects: mentorData.selectedSubjects,
    major: mentorData.major,
    role: 'MENTOR', 
    introduction: mentorData.introduction,
    notificationPreference:mentorData.notificationPreference
})


export const createStudentModel = (studentData) => {
    return {
        name: studentData.studentName,
        email: studentData.studentEmail,
        gradeLevel: studentData.selectedGradeLevel,
        subjects: studentData.selectedSubjects,
    }
}

/**
 * Gets all the data from the from and creates a parent 
 * object based on the parent schema.
 * @param {object} parentData - Fields the parent filled out.
 */
export const createParentModel = (parentData) => {
    return {
        name: parentData.parentName,
        phone: parentData.parentPhoneNumber,
        timezone: parentData.timeZone,
        email: parentData.parentEmail,
        students: parentData.registeredChildren
            .map((studentData) => createStudentModel(studentData)),
        role: 'PARENT',
        notificationPreference:parentData.notificationPreference
    }
}

export default {
    createMentorModel,
    createParentModel,
    createStudentModel,
}
