// const firebase = require('firebase-admin');
const userDb = require('../../db/users');
const mongoToFirebase = require('../../../server/scripts/mongo_to_firebase');
jest.mock('firebase-admin');

describe('Mongo to Firebase', () => {
  test('oldMentor', async () => {
    const mongoMentor = {
      email: "johanc@mit.edu",
      subjects: ["Science", "Physics", "College Prep - Essays", "Computer Science"],
      languages_spoken: [],
      grade_levels_to_mentor: [],
      mentees: [],
      tags: ["High School"],
      firebase_uid: "JTWXFGxohRdzdd0b4eiDwYxxBLH2",
      name: "Johan Cervantes",
      timezone: "Pacific Daylight Time - Los Angeles (GMT-7)",
      bio: "A bit about me: I am from LA, have 2 dogs, and ran up 720 flights of stairs in 4 hours last January. ",
      major: "Computer Science, Minor in Statistics, Concentration in Acting"
    }

    mongoToFirebase.addOldMentorToNewSite(mongoMentor);
    // TODO: cannot equate an object to a promise
    expect(userDb.getUser(mongoMentor.firebase_uid)).toBe(mongoMentor).toBeTruthy();
  });

  test('oldParent', async () => {
    const mongoParent = {
      subjects: ["Math"],
      mentors: [],
      tags: ["Elementary School"],
      _id: "5eac53057b1df905046f1a5d",
      firebase_uid: "ZN99Nhaql5MWdf4mcO0zLjxIodI2",
      name: "Carlos Funes",
      email: "funcarl@gmail.com",
      timezone: "Mountain Daylight Time - Denver (GMT-6)",
      bio: "",
      __v: 0,
      student_email: "lilg@gmail.com",
      student_name: "bigG"
    }

    mongoToFirebase.addOldParentToNewSite(mongoParent);
    // TODO: cannot equate an object to the promise
    expect(userDb.getUser(mongoParent.firebase_uid)).toBe(mongoParent).toBeTruthy();
  });
});
