/** Mentor Object */
export default class Mentor {

    /**
     * Use this class to create and modify mentors in firebase.
     * @constructor
     */
    constructor(name, email, timezone, introduction, subjects, tags) {
        this.id = undefined;
        this.name = name;
        this.email = email;
        this.timezone = timezone;
        this.introduction = introduction;
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
}
