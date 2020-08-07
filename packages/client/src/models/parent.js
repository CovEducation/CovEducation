import { Db } from '../providers/FirebaseProvider';

const ParentCollectionRef = Db.collection('parents');

/** Firebase Parent Convertor */
const ParentConverter = {
    toFirestore: (parent) => {
        const students = [];

        // must convert Mentee object to plain json
        parent.students.forEach(s => {
            students.push({
                name: s.name,
                email: s.email,
                grade: s.grade,
                subjects: s.subjects
            });
        });

        return {
            name: parent.name,
            email: parent.email,
            phone: parent.phone,
            pronouns: parent.pronouns,
            avatar: parent.avatar,
            timezone: parent.timezone,
            students: students
        };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);

        const students = [];

        data.students.forEach(s => {
            students.push(new Student(s.name, s.email, s.grade, s.subjects))
        });

        return new Parent(
            data.name,
            data.email,
            data.phone,
            data.pronouns,
            data.avatar,
            data.timezone,
            data.number_requests,
            students
        );
    }
}

// this is mainly just a convenient constructor
export class Student {
    constructor(name, email, grade, subjects) {
        this.name = name;
        this.email = email;
        this.grade = grade;
        this.subjects = subjects;
    }
}

/** Firebase Parent Object */
export default class Parent {
    constructor(name, email, phone, pronouns, avatar, timezone, number_requests, students) {
        this.id = undefined;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.pronouns = pronouns;
        this.avatar = avatar;
        this.timezone = timezone;
        this.number_requests = number_requests;
        this.students = students;

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

