// const firebase = require('firebase-admin');
// const userDb = require('../../db/users');
import {
  addOldMentorToNewSite,
  addOldParentToNewSite
} from '../../scripts/mongo_to_firebase';

jest.mock('firebase-admin');

describe('Mongo to Firebase', () => {
  test('oldMentor', async () => {
    const mongoMentor = {
      subjects: ["Science", "Physics", "College Prep - Essays", "Computer Science"],
      languages_spoken: [],
      grade_levels_to_mentor: [],
      mentees: [],
      tags: ["High School"],
      _id: "5eabc0b4b5da140024fcc363",
      firebase_uid: "JTWXFGxohRdzdd0b4eiDwYxxBLH2",
      name: "Johan Cervantes",
      email: "johanc@mit.edu",
      timezone: "Pacific Daylight Time - Los Angeles (GMT-7)",
      bio: "A bit about me: I am from LA, have 2 dogs, and ran up 720 flights of stairs in 4 hours last January. ",
      major: "Computer Science, Minor in Statistics, Concentration in Acting",
      last_request: "2020-07-06T22:45:58.222Z",
      public: true,
      __v: 0
    }
    expect(addOldMentorToNewSite(mongoMentor)).toBeTruthy();
    // expect();
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
      student_name: "bigG",
    }
    expect(addOldParentToNewSite(mongoParent)).toBeTruthy();

  });
});