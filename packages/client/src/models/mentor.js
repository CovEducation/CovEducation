import { Db } from '../providers/FirebaseProvider';
import * as Yup from 'yup';

const MentorCollectionRef = Db.collection('mentors');

/** This defines how the plain json returned by firebase should be converted */
const MentorConverter = {
    toFirestore: (mentor) => {
        return {
            name: mentor.name,
            email: mentor.email,
            phone: mentor.phone,
            pronouns: mentor.pronouns,
            college: mentor.college,
            avatar: mentor.avatar,
            bio: mentor.bio,
            major: mentor.major,
            timezone: mentor.timezone,
            subjects: mentor.subjects,
            tags: mentor.tags,
            gradeLevels: mentor.gradeLevels,
            notificationPreference:mentor.notificationPreference
        };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Mentor(
            data.name,
            data.email,
            data.phone,
            data.pronouns,
            data.college,
            data.avatar,
            data.bio,
            data.major,
            data.timezone,
            data.subjects,
            data.tags,
            data.gradeLevels,
            data.notificationPreference
        );
    }
};

const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
);

const mentorSchema = Yup.object().shape({
    email: Yup
        .string()
        .email()
        .required('Email Required'),
    name: Yup
        .string()
        .required('Name Required'),
    timezone: Yup
        .string()
        .required('Timezone Required'),
    phone: Yup
        .string()
        .matches(phoneRegex, 'Phone number is not valid'),
    pronouns: Yup
        .string(),
    college: Yup
        .string(),
    avatar: Yup
        .string()
        .required('Avatar Required'),
    bio: Yup
        .string()
        .required('Bio Required'),
    major: Yup
        .string(),
    subjects: Yup
        .array()
        .required('Subjects Required'),
    gradeLevels: Yup
        .array()
        .required('Grade Levels Required'),
    notificationPreference: Yup
        .string()
});

/** Firebase Mentor Object */
export default class Mentor {

    /**
     * Use this class to create and modify mentors in firebase.
     * @constructor
     */
    constructor(
        name,
        email,
        phone,
        pronouns,
        college,
        avatar,
        bio,
        major,
        timezone,
        subjects,
        tags,
        gradeLevels,
        notificationPreference
    ) {
        this.id = undefined;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.pronouns = pronouns;
        this.college = college;
        this.avatar = avatar;
        this.bio = bio;
        this.major = major;
        this.timezone = timezone;
        this.subjects = subjects;
        this.tags = tags;
        this.gradeLevels = gradeLevels;
        this.role = 'MENTOR';
        this.notificationPreference = notificationPreference
        this.validate();
    }

    /**
     * The validation asynchronously checks the data against the restrictions of Yup
     * TODO: More validation needs to be done on how the error is returned to the client.
     */
    async validate() {
        const valid = await mentorSchema.isValid(Mentor);
        if (!valid) {
            throw Error('Malformed mentor object.');
        }
    }

    /**
     * Updates an existing mentor record from firebase.
     * Note: the id is automatically populated by firebase. DO NOT mutate
     * the `id` field.
     *
     * @return {Promise<void>} a promise indicating successful update.
     */
    update() {
        this.validate();

        if (!this.id) {
            return Promise.reject('Mentor update failed: not initialized with firebase uid');
        }

        return MentorCollectionRef.doc(this.id)
            .withConverter(MentorConverter)
            .update(this);
    }

    /**
     * Publishes the current mentor instance to firebase
     * @param {firebase.auth.UserCredential} user object from firebase
     *
     * @return {Promise<void>} a promise indicating successful creation.
     */
    create(user) {
        this.validate();
        this.id = user.uid; // Saving the id in the object so update can be called.
        return MentorCollectionRef.doc(this.id)
            .withConverter(MentorConverter)
            .set(this);
    }

    /**
     * Reads the Mentor object from firebase.
     * @param {firebase.auth.UserCredential}  user has firebase auth uid of the mentor
     *
     * @return {Promise<Mentor>} the mentor with the corresponding uid
     */
    static async get(user) {
        const mentorRes = await MentorCollectionRef.doc(user.uid)
            .withConverter(MentorConverter)
            .get();

        if (mentorRes.exists) {
            const mentor = mentorRes.data();
            mentor.id = user.uid;
            return mentor;
        } else {
            return undefined;
            // TODO throw Error(`Mentor data doesn't exist for user ${id}`);
        }
    }
}
