const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const userSchema = require('../../schemas/user.schemas');
const UserDB = mongoose.model('User', userSchema);

router.get('/', async (req, res) => {
    let data = await UserDB.find();
    res.send({ data: data })
})
router.post('/', async (req, res) => {
    let { user } = req.body;
    let result = new UserDB(user);
    await result.save();
    res.status(200).send({ data: result });
})

router.get('/search', async (req, res) => {
    let { keyword } = req.query;
    let result = await UserDB.find({ email: { $regex: keyword, $options: 'i' } });
    res.send({ result: result });
})
router.post('/sendReq', async (req, res) => {
    let { data } = req.body;
    let result = await UserDB.updateOne({ _id: data.to },
        { $push: { req: data.from } }
    )
    res.send({ result: result });
})
router.put('/acceptReq', async (req, res) => {
    let { data } = req.body;

    await UserDB.updateOne({ _id: data.from },
        { $push: { friends: { room: data.room, friend: data.to } } }
    )
    await UserDB.updateOne({ _id: data.to },
        { $push: { friends: { room: data.room, friend: data.from } } }
    )
    res.send({ result: "done" });
})
router.put('/deleteGroup', async (req, res) => {
    let { data } = req.body;
    let result = await UserDB.findOneAndUpdate({ _id: data.user },
        { $pull: { groups: data.room } }
    )
    res.send({ result: "done" });
})


router.put('/addToGroup', async (req, res) => {
    let { data } = req.body;
    let result = await UserDB.updateOne({ _id: data.user },
        { $push: { groups: data.room } })
    res.send({ result: result });
})
router.delete('/deniedReq', async (req, res) => {
    let { currId, _id } = req.query;
    let result = await UserDB.updateOne({ _id: currId },
        { $pull: { req: _id } }
    )
    res.send({ result: result });
})
router.get('/checkSend', async (req, res) => {
    let { to, from } = req.query;
    let count = await UserDB.findById(to).countDocuments({ req: from });
    res.send({ count: count });
})
router.get('/chat', async (req, res) => {
    let { skip, limit } = req.query;
    console.log(skip, limit);
    res.send({ count: 'count' });
})
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let data = await UserDB.findById(id)
    res.send({ data: data })
})
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let result = await UserDB.findByIdAndRemove(id);
    res.send({ data: result });
})
router.get('/uid/:uid', async (req, res) => {
    let uid = req.params.uid;
    let data = await UserDB.find({ uid: uid }).populate("req").populate("friends.friend").populate("groups");
    res.send({ data: data })
})
router.get('/checkUid/:uid', async (req, res) => {
    let uid = req.params.uid;
    let count = await UserDB.countDocuments({ uid: uid });
    res.send({ count: count });
})
module.exports = router;