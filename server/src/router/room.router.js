const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();
const roomSchema = require('../../schemas/room.schemas');
const RoomDB = mongoose.model('Room', roomSchema);

router.get('/', async (req, res) => {
    let data = await RoomDB.find();
    res.send({ data: data })
})

router.post('/', async (req, res) => {
    let { room } = req.body;
    let result = new RoomDB(room);
    await result.save();
    res.status(200).send({ data: result });
})
router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let result = await RoomDB.findById(id).populate('user');
    res.send({ data: result });
})

router.put('/addUser', async (req, res) => {
    let { data } = req.body;
    let result = await RoomDB.updateOne({ _id: data.room },
        { $push: { user: data.user } }
    )
    res.status(200).send({ data: result });
})

router.put('/deleteUser', async (req, res) => {
    let { data } = req.body;
    let result = await RoomDB.findOneAndUpdate({ _id: data.room },
        { $pull: { user: data.user } }
    )
    res.status(200).send({ data: result });
})
router.put('/update/:id', async (req, res) => {
    let id = req.params.id;
    let { data } = req.body;
    let result = await RoomDB.findByIdAndUpdate({ _id: id }, data);
    res.send({ data: result });
})
module.exports = router;