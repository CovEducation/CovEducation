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
            tags: mentor.tags
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
            data.tags
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
            return Promise.reject('Mentor update failed: not intialized with firebase uid');
        }

        return MentorCollectionRef.doc(this.id)
            .withConverter(MentorConverter)
            .update();
    }

    /**
     * Publishes the current mentor instance to firebase
     * @param {string} the firebase auth uid. DO NOT use any other value.
     *
     * @return {Promise<void>} a promise indicating successful creation.
     */
    create(id) {
        this.validate();
        this.id = id; // Saving the id in the object so update can be called.
        return MentorCollectionRef.doc(id)
            .withConverter(MentorConverter)
            .set(this);
    }

    /**
     * Reads the Mentor object from firebase.
     * @param {string} the firebase auth uid of the mentor
     *
     * @return {Promise<Mentor>} the mentor with the corresponding uid
     */
    static async get(id) {
        const mentor = await MentorCollectionRef.doc(id)
            .withConverter(MentorConverter)
            .get();

        if (mentor.exists) {
            return mentor.data();
        } else {
            return undefined;
            // TODO throw Error(`Mentor data doesn't exist for user ${id}`);
        }
    }
}
