const express = require('express');
const authMiddleware = require('../middleware/auth');
const db = require('../db/user');
const { json } = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', authMiddleware, async (req, res) => {
    const uid = req.user.uid;

    try {
        const user = await db.getUser(uid);
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

/* POST a new user given the firebase token */
router.post('/', authMiddleware, async (req, res, next) => {
    const uid = req.user.uid;

    console.log(JSON.stringify(req.body));

    try {
        const user = await db.createUser(uid, req.body);
        res.send(user);
    } catch (err) {
        // TODO we will want to delete the firebase auth document if there is any error
        // creating the new user.
        res.status(500).send(err);
        console.log(err)
    }
});


router.patch('/', authMiddleware, async (req, res) => {

});

module.exports = router;
