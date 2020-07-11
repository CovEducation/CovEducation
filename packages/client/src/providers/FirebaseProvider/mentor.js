import { Db } from './firebase';

const MentorCollectionRef = Db.collection("mentors");

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
        return new Mentor(data.name, data.email, data.timezone, data.about, data.subjects, data.tags);
    }
};

export default class Mentor {
    constructor(name, email, timezone, about, subjects, tags) {

        this.name = name;
        this.email = email;
        this.timezone = timezone;
        this.about = about;
        this.subjects = subjects;
        this.tags = tags;

        this.validate();
    }

    validate() {
        if (!this.name) throw Error("Mentor must have a name");
        if (!this.email) throw Error("Mentor must have a name");
        if (!this.timezone) throw Error("Mentor must have timezone");
    }

    save(id) {
        this.validate();
        return MentorCollectionRef.doc(id)
            .withConverter(MentorConverter)
            .set(this);
    }

    static async get(id) {
        try {
            const mentor = await MentorCollectionRef.doc(id)
                        .withConverter(MentorConverter)
                        .get();

            if (mentor.exists) {
                return mentor.data();
            } else {
                return null;
            }
        } catch(err) {
            console.log(err);
            return null;
        }
    }
}