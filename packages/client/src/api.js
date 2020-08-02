// Set of API endpoints available to all pages. This should make the get, post, update, and delete
// requests necessary.
import { get } from './utilities.js';

/**
 * Returns mentors given a set of filters.
 * @param {String} gradeLevel - The grade level of the student looking for a mentor.
 * @param {list} subjects - Subjects the mentor should be willing to help on.
 * @param {list} specialNeeds - Any special needs the student might need.
 */
export const getMentors = async (gradeLevel, subjects, specialNeeds) => {
    return await get('/mentors', {
        gradeLevel: gradeLevel,
        subjects: subjects,
        specialNeeds: specialNeeds,
    })
}
