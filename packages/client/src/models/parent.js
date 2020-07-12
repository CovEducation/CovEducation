import { Db } from '../providers/FirebaseProvider';

const ParentCollectionRef = Db.collection('parents');

const ParentConverter = {
    toFirestore: (parent) => {
        return {
            name: parent.name,
            email: parent.email,
            timezone: parent.timezone,
            mentees: parent.mentees
        };
    },

    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Parent(
            data.name,
            data.email,
            data.timezone,
            data.mentees
        );
    }
}

export default class Parent {
    constructor(name, email, timezone, mentees) {
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

    save(id) {
        this.validate();
        return ParentCollectionRef.doc(id)
            .withConverter(ParentConverter)
            .set(this);
    }

    static async get(id) {
        try {
            const parent = await ParentCollectionRef.doc(id)
                .withConverter(ParentConverter)
                .get();

            if (parent.exists) {
                return parent.data();
            } else {
                throw Error(`Parent data doesn't exist for user ${id}`);
            }
        } catch (err) {
            // TODO: don't use try catch
            return null;
        }
    }
}

