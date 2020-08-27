// Mainly used to validate the server response.
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
    constructor(name, email, timezone, students) {
        this.id = undefined;
        this.name = name;
        this.email = email;
        this.timezone = timezone;
        this.students = students;
        this.validate();
    }

    validate() {
        if (!this.name) throw Error('Parent must have a name');
        if (!this.email) throw Error('Parent must have an email');
        if (!this.timezone) throw Error('Parent must have timezone');
        if (!this.students) throw Error('Parent must have at least one student.');
    }
}

