const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();

const messSchema = require('../../schemas/message.shemas');
const MessDB = mongoose.model('Message', messSchema);
router.get('/chat', (req, res) => {
    let { room, limit, count } = req.query;
    limit = parseInt(limit);
    count = parseInt(count);
    let countNum = count || 0
    let limitNum = limit || 10
    skip = countNum * limitNum;
    (async () => {
        let data = await MessDB.find({ room: room }).sort({index:-1}).skip(skip).limit(limit).populate("user");
        // let data = await RoomDB.aggregate([
        //     {
        //         $match: {
        //             _id: mongoose.Types.ObjectId(room.toString())
        //         }
        //     },
        //     { $unwind: '$message' },
        //     {
        //         $sort: {
        //             'message.index': -1
        //         }
        //     }, { $project: { message: "$message" } },
        //     { $skip: skip },
        //     { $limit: limit },
        //     { $lookup: { from: 'users', localField: 'message.user', foreignField: '_id', as: 'user' } }

        // ]);
        res.send({ data: data })
    })();
})

// router.get('/:id', async (req, res) => {
//     let id = req.params.id;
//     let data = await RoomDB.findById(id);
//     res.send({ data: data })
// })



router.post('/chat', async (req, res) => {
    let { data } = req.body;
    let result = new MessDB(data);
    await result.save();
    res.send({ data: true})
})
module.exports = router;