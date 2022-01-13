const app = require('express');
let mongoose = require('mongoose');
const router = app.Router();
const ObjectId = mongoose.Types.ObjectId;

// const subjectSchema = require('../../schemas/subject.schemas');
// const SubjectDB = mongoose.model('Subject', subjectSchema);

const roomSchema = require('../../schemas/room.schemas');
const RoomDB = mongoose.model('Room', roomSchema);

// const teacherSchema = require('../../schemas/teacher.schemas');
// const TeacherDB = mongoose.model('Teacher', teacherSchema);

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


router.get('/chat',  (req, res) => {
    let { room, limit, count } = req.query;
    limit = parseInt(limit);
    count = parseInt(count);
    let countNum = count || 0
    let limitNum = limit || 10
    skip = countNum * limitNum;
    (async () => {
        let data = await RoomDB.aggregate([
            {
                $match: {
                    _id: ObjectId(room)
                }
            },
            { $unwind: '$message' },
            {
                $sort: {
                    'message.index': -1
                }
            }, { $project: { message: "$message" } },
            { $skip: skip },
            { $limit: limit },
            { $lookup: { from: 'users', localField: 'message.user', foreignField: '_id', as: 'user' } }
    
        ]);
        res.send({ data: data })
    })();
})

// router.get('/:id', async (req, res) => {
//     let id = req.params.id;
//     let data = await RoomDB.findById(id);
//     res.send({ data: data })
// })



router.put('/chat', (req, res) => {
    let { data } = req.body;
    (async () => {
        
        let dataCount = await RoomDB.aggregate([{ $match: { _id: ObjectId(data.room) } }, { $project: { count: { $size: "$message" } } }])
        let temp = {
            ...data,
            index: parseInt(dataCount[0].count)
        }
        await RoomDB.findByIdAndUpdate(data.room, { $push: { message: temp } });
        res.send({ data: temp.index })
    })();



})

// router.put('/:id', async (req, res) => {
//     let { subject } = req.body;
//     let subjectId = req.params.id;
//     let result = await SubjectDB.findByIdAndUpdate(subjectId, subject);
//     res.send({ data: result });
// })
// router.get('/sort/:field', async (req, res) => {
//     let field = req.params.field;
//     let { sort } = req.query;
//     let data;
//     if (field == "Title") {
//         if (sort == "asc") {
//             data = await SubjectDB.find().sort({ Title: 1 });
//         } else if (sort == "dsc") {
//             data = await SubjectDB.find().sort({ Title: -1 });
//         }
//     } else {
//         data = await SubjectDB.find();
//     }
//     res.send({ data: data })
// })
// router.get('/keyword/:keyword', async (req, res) => {
//     let keyword = req.params.keyword;
//     let result = await SubjectDB.find({ Title: { $regex: keyword, $options: 'i' } })
//     res.send({ data: result })
// })

// router.delete('/:id', async (req, res) => {
//     let subjectId = req.params.id;
//     // let result = await TeacherDB.find({}).select({"_id":subjectId});
//     let result = await SubjectDB.findByIdAndRemove(subjectId);
//     await TeacherDB.updateMany({
//         Subject: [
//             subjectId
//         ]
//     }, { $unset: { Subject: [subjectId] } });
//     res.send({ data: result });
// })

module.exports = router;