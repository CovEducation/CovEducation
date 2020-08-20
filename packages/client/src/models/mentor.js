import { Db } from '../providers/FirebaseProvider';

const MentorCollectionRef = Db.collection('mentors');

/** This defines how the plain json returned by firebase should be converted */
const MentorConverter = {
    toFirestore: (mentor) => {
        return {
            name: mentor.name,
            email: mentor.email,
            timezone: mentor.timezone,
            about: mentor.about,
            subjects: mentor.subjects,
            tags: mentor.tags,
            role: mentor.role,
        };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Mentor(
            data.name,
            data.email,
            data.timezone,
            data.about,
            data.subjects,
            data.tags,
            data.role,
        );
    }
};

/** Firebase Mentor Object */
export default class Mentor {

    /**
     * Use this class to create and modify mentors in firebase.
     * @constructor
     */
    constructor(name, email, timezone, about, subjects, tags) {
        this.id = undefined;
        this.name = name;
        this.email = email;
        this.timezone = timezone;
        this.about = about;
        this.subjects = subjects;
        this.tags = tags;
        this.role = 'MENTOR';

        this.validate();
    }

    validate() {
        // TODO use Yup for object validation; this validation just needs
        // to run in development
        if (!this.name) throw Error('Mentor must have a name');
        if (!this.email) throw Error('Mentor must have an email');
        if (!this.timezone) throw Error('Mentor must have timezone');
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
     * @param {firebase.auth.UserCredential} the firebase user object
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
     * @param {firebase.auth.UserCredential} the firebase auth uid of the mentor
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
