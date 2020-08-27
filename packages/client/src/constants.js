import React from "react";

export const COLORS = {
  blue: '#19568C',
  yellow: '#F2BE32',
  white: '#FFFFFF',
  darkblue: '#0F3C61',
  grey: '#D2D2D2',
  lightgray: '#EDEDED',
  lightorange: '#FFF6DE',
  lightblue: '#E7F2FB',
  black: '#000000',
};

export const FONTS = {
  font1: "'Raleway', sans-serif",
  font2: "'Montserrat', sans-serif",
};

export const FAQS = [
  {
    key: "0",
    category: "mentee",
    question: "Who is eligible to be mentored?",
    answer: <div>All K-12 students in the US who are currently struggling with classes are eligible to be matched with an undergraduate or postgraduate mentor for personalized mentorship and academic support. We are especially committed to supporting underprivileged students. For students under the age of 18, we require that a parent or guardian be present during all mentoring sessions.</div>
  },
  {
    key: "1",
    category: "general",
    question: "What services are available?",
    answer: <div>Our mentors provide tutoring services for K-12 school subjects, including many Honors and AP classes. Additionally, some of our mentors are willing to help with college preparation, such as standardized testing (SAT, ACT, AP, etc.).</div>
  },
  {
    key: "2",
    category: "general",
    question: "How does mentoring work?",
    answer: <div>Mentoring sessions will be conducted online via video chat. We suggest using Skype, Google Hangouts, or Zoom, although the the decision is up to the parent or guardian, student, and mentor.</div>
  },
  {
    key: "3",
    category: "mentee",
    question: "What if I do not have access to Wi-Fi?",
    answer: <div>Spectrum is providing free Wi-Fi services for students during the school shutdown. Their number is 1-844-488-8398. Mentoring lessons can also be held via phone call.</div>
  },
  {
    key: "4",
    category: "mentee",
    question: "How do I get matched with a mentor? How does the matching process work?",
    answer: <div>After filling out the registration form and verifying their emails, parents/guardians will be able to access our 'Find a Mentor' page to find a mentor for their child. From there, they will be able to send messages to any of our mentors. Please do not request more than 1 mentor per student per 24 hour period.</div>
  },
  {
    key: "5",
    category: "mentee",
    question: "How many mentors can each student have?",
    answer: <div>Each student is paired with one mentor.</div>
  },
  {
    key: "6",
    category: "mentee",
    question: "What if I have multiple students I want to request mentors for?",
    answer: <div>Parents/guardians are able to request for up to 4 students, with a maximum of one mentor request per student. Be sure to mention the name of the student you're requesting for.</div>
  },
  {
    key: "7",
    category: "mentor",
    question: "How many hours a week do I have to commit?",
    answer: <div>We suggest students and mentors meet between 1-2 hours a week, although this can be decided among mentorship pairs. This may depend on the student’s needs as well as the mentor’s availability.</div>
  },
  {
    key: "8",
    category: "mentee",
    question: "How long will CovEd mentors provide mentoring?",
    answer: <div>We expect mentors to be able to help until the end of the academic year for the student. Moreover, due to demand, we are working with many mentors to provide tutoring through the summer.</div>
  },
  {
    key: "9",
    category: "mentor",
    question: "What are the responsibilities of a mentor?",
    answer: <div>Mentors are responsible for volunteering a minimum of 45 mins a week of their time to help their matched mentee with the subjects the mentee requests help in. While a mentor is only matched with one mentee, they can reach out if they would like to mentor more. Mentors are expected to help their mentee until the end of the 2020 academic school year. Additionally, all mentors must comply with the CovEd safety guidelines and expectations provided to them at all times.</div>
  },
  {
    key: "10",
    category: "mentee",
    question: "How are you addressing concerns of student safety?",
    answer: <div>Our safety guidelines during our mentoring sessions include (but are not limited to): receiving consent from the mentee’s parent or legal guardian, having a parent or guardian present during the lessons, having mentors document the lessons, and instituting a “no social media contact with your mentee” policy. For further information please check our Privacy Policy and the Mentor Guidelines. Links to both can be found at the bottom of this page!</div>
  },
  {
    key: "11",
    category: "general",
    question: "How are you reaching students in disadvantaged situations?",
    answer: <div>Our outreach team is actively publicizing CovEd to school districts across the US, and we strive to be a useful resource for students in all situations. We especially encourage parents of underprivileged students to register their students for academic support through CovEd.</div>
  },
  {
    key: "12",
    category: "mentee",
    question: "Can you help students that do not speak English very well?",
    answer: <div>Yes! We have mentors that are fluent in various languages and if this is a concern, be sure to mention this in the special requests/concerns portion of the registration form and we will definitely work to accommodate this. Additionally, we are working on translating all flyers and publicity materials into different languages to reach students regardless of their first language.</div>
  },
  {
    key: "13",
    category: "general",
    question: "Is there any way for educators to get involved?",
    answer: <div>One of CovEd’s goals is to ensure that all students have access to various resources to help stimulate educational growth during this time. On our website’s home page, we have a form where resources can be submitted. We are hoping to find the best resources for students and hope you can help us!</div>
  },
  {
    key: "14",
    category: "general",
    question: "Is this service free?",
    answer: <div>Yes! This service is completely free and all of our mentors are volunteers.</div>
  },
  {
    key: "15",
    category: "mentor",
    question: "As a teacher, can I sign up on behalf of my students?",
    answer: <div>We've worked with teachers in a similar situation before. If this is something you would like to consider, please reach out to <a href="mailto: coveducation@gmail.com">coveducation@gmail.com</a></div>
  },
  {
    key: "16",
    category: "mentor",
    question: "When will I know if I am requested?",
    answer: <div>You'll get an email - please be sure to keep an eye on the email you used to sign up!</div>
  }
  ,
  {
    key: "17",
    category: "mentor",
    question: "What if I can no longer mentor my mentee?",
    answer: <div>We ask that you let the parent of your mentee know that you can no longer be a mentor, and then work with them to help them request a new mentor. Once they have been contacted by a new mentor, please set up a time to meet the new mentor and bring them up-to-speed on your mentee's progress and needs.</div>
  }
  ,
  {
    key: "18",
    category: "general",
    question: "What do you use donations for?",
    answer: <div> This year we need donations for applying to be a non-profit and for our technological operation expenses. To see a further breakdown of our costs and projected costs, please visit <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTJPlD1iXGjSdVbyiPoEETMNBDUEkYbyoHpMO1CHfpJbl5zqRCgvy5O_QC9ElQpCm0aNAfYrei1F3__/pubhtml?gid=1646064687&single=true"> this spreadsheet </a>.</div>
  }
  ,
  {
    key: "19",
    category: "general",
    question: "Is CovEducation a 501(c)(3) nonprofit?",
    answer: <div> Yes! </div>
  }
]
export const timeZones = [
  {
    value: "GMT-4",
    timezone: "Eastern Daylight Time - Boston (GMT-4)"
  },
  {
    value: "GMT-5",
    timezone: "Central Daylight Time - Chicago (GMT-5)"
  },
  {
    value: "GMT-6",
    timezone: "Mountain Daylight Time - Denver (GMT-6)"
  },
  {
    value: "GMT-7",
    timezone: "Pacific Daylight Time - Los Angeles (GMT-7)"
  },
  {
    value: "GMT-8",
    timezone: "Alaska Daylight Time - Anchorage (GMT-8)"
  },
  {
    value: "GMT-10",
    timezone: "Hawaii-Aleutian Standard Time - Honolulu (GMT-10)"
  },
]

export const subjects = [
  {
    value: "English",
    label: "English"
  },
  {
    value: "History",
    label: "History"
  },
  {
    value: "Science",
    label: "Science"
  },
  {
    value: "Math",
    label: "Math"
  },
  {
    value: "Physics",
    label: "Physics"
  },
  {
    value: "Chemistry",
    label: "Chemistry"
  },
  {
    value: "Biology",
    label: "Biology"
  },
  {
    value: "College Prep - SATs/ACTs",
    label: "College Prep - SATs/ACTs",
  },
  {
    value: "College Prep - Essays",
    label: "College Prep - Essays"
  },
  {
    value: "Writing",
    label: "Writing",
  },
  {
    value: "Economics",
    label: "Economics"
  },
  {
    value: "Studio/Visual Art",
    label: "Studio/Visual Art"
  },
  {
    value: "Music",
    label: "Music"
  },
  {
    value: "Theatre",
    label: "Theatre"
  },
  {
    value: "Design",
    label: "Design"
  },
  {
    value: "Computer Science - Python",
    label: "Computer Science - Python"
  },
  {
    value: "Computer Science - C/C++",
    label: "Computer Science - C/C++"
  },
  {
    value: "Computer Science - Java",
    label: "Computer Science - Java"
  },
  {
    value: "AP Physics C",
    label: "AP Physics C"
  },
  {
    value: "AP Calculus AB",
    label: "AP Calculus AB"
  },
  {
    value: "AP Calculus BC",
    label: "AP Calculus BC"
  },
  {
    value: "AP Statistics",
    label: "AP Statistics"
  },
  {
    value: "AP English Literature",
    label: "AP English Literature"
  },
  {
    value: "AP English Language",
    label: "AP English Language"
  },
  {
    value: "AP World History",
    label: "AP World History"
  },
  {
    value: "AP US History",
    label: "AP US History"
  },
  {
    value: "AP Chemistry",
    label: "AP Chemistry"
  },
  {
    value: "AP Biology",
    label: "AP Biology"
  },
  {
    value: "AP European History",
    label: "AP European History"
  },
  {
    value: "Spanish",
    label: "Spanish"
  },
  {
    value: "French",
    label: "French"
  },
  {
    value: "Chinese",
    label: "Chinese"
  },
  {
    value: "German",
    label: "German"
  },
  {
    value: "Latin",
    label: "Latin"
  },
  {
    value: "Japanese",
    label: "Japanese"
  },
  {
    value: "Experienced in Special Education (SPED)",
    label: "Experienced in Special Education (SPED)"
  },
  {
    value: "English as a Second Language (ESL)",
    label: "English as a Second Language (ESL)"
  }
];

export const tags = ["Early Childhood Learning", "Preschool", "Elementary School", "Middle School", "High School"]
  .map(k => { return { label: k, value: k } });
