import { Db } from '../providers/FirebaseProvider';

const ParentCollectionRef = Db.collection('parents');

/** Firebase Parent Convertor */
const ParentConverter = {
    toFirestore: (parent) => {
        const mentees = [];

        // must convert Mentee object to plain json
        parent.mentees.forEach(s => {
            mentees.push({
                name: s.name,
                email: s.email,
                grade: s.grade,
                subjects: s.subjects
            });
        });

        return {
            name: parent.name,
            email: parent.email,
            timezone: parent.timezone,
            mentees: mentees
        };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);

        const mentees = [];

        data.mentees.forEach(s => {
            mentees.push(new Mentee(s.name, s.email, s.grade, s.subjects))
        });

        return new Parent(
            data.name,
            data.email,
            data.timezone,
            mentees
        );
    }
}

// this is mainly just a convenient constructor
export class Mentee {
    constructor(name, email, grade, subjects) {
        this.name = name;
        this.email = email;
        this.grade = grade;
        this.subjects = subjects;
    }
}

/** Firebase Parent Object */
export default class Parent {
    constructor(name, email, timezone, mentees) {
        this.id = undefined;
        this.name = name;
        this.email = email;
        this.timezone = timezone;
        this.mentees = mentees;

        this.validate();
    }

    validate() {
        if (!this.name) throw Error('Parent must have a name');
        if (!this.email) throw Error('Parent must have an email');
        if (!this.timezone) throw Error('Parent must have timezone');
    }

    /**
     * Updates an existing parent record in firebase.
     * Note: the id is populated by firebase. DO NOT mutate
     *
     * @return {Promise<void>} a promise indicating successful update.
     */
    update() {
        this.validate();

        if (!this.id) {
            return Promise.reject('Parent update failed: not initialized with firebase uid');
        }

        return ParentCollectionRef.doc(this.id)
            .withConverter(ParentConverter)
            .update(this);
    }

    /**
     * Publishes the current parent instance to firebase. If a parent
     * with the firebase uid already exists the record is updated.
     * @param {firebase.auth.UserCredential} user is firebase auth user object
     *
     * @return {Promise<void>} a promise indicating successful creation.
     */
    create(user) {
        this.validate();
        this.id = user.uid;
        return ParentCollectionRef.doc(this.id)
            .withConverter(ParentConverter)
            .set(this);
    }

    /**
     * Reads the Parent object from firebase.
     * @param {firebase.auth.UserCredential} user is firebase auth uid of the parent
     *
     * @return {Promise<Parent>} the parent with the corresponding uid
     */
    static async get(user) {
        const parentRes = await ParentCollectionRef.doc(user.uid)
            .withConverter(ParentConverter)
            .get();

        if (parentRes.exists) {
            const parent = parentRes.data();
            parent.id = user.uid;
            return parent;
        } else {
            return undefined;
            // throw Error(`Parent data doesn't exist for user ${id}`);
        }
    }
}

