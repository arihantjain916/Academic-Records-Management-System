const asyncHandler = require("express-async-handler");
const Class = require("../components/models/class");
const Subject = require("../components/models/subject");

// @description           Create class Function
// @route                 POST api/v1/class/create
// @access                Private
const createclass = asyncHandler(async (req, res) => {
    if (req.isAdmin) {
        const { name } = req.body;

        // Check if the class already exists
        const existingClass = await Class.findOne({ name });
        if (existingClass) {
            return res.status(409).json({ message: "Class already exists" });
        }
        try {
            const clas = new Class({
                name,
            });
            await clas.save();
            res.status(201).json({
                data: clas,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(403).json({ message: "Only admin can register students" });
    }
});

// @description           Create Subject Function
// @route                 POST api/v1/class/:id/subjects
// @access                Private
const createsubject = asyncHandler(async (req, res) => {
    if (req.isAdmin) {
        try {
            const classId = req.params.id;
            const subjects = req.body.subjects; //Array is going to pass of subjects

            if (classId.length != 24) {
                return res.status(500).json({
                    error: "Invalid Id ",
                });
            }

            foundClass = await Class.findById(classId);
            if (!foundClass) {
                return res.status(500).json({
                    error: "Class not found",
                });
            }
            if (!Array.isArray(subjects) || subjects.length === 0) {
                return res
                    .status(400)
                    .json({ error: "Subject names array is empty or null" });
            }
            const subjectcreate = subjects?.map(async (subject) => {
                if (!subject) {
                    return res.status(400).json({ error: "Subject Required" });
                }
                const createdSubject = await Subject.create({ name: subject });
                await foundClass.subjects.push(createdSubject._id);
                return createdSubject;
            });
            const createdsubjects = await Promise.all(subjectcreate);

            await foundClass.save();

            return res.status(200).json({
                data: createdsubjects,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(403).json({ message: "Only admin can add subjects" });
    }
});

// @description           Get Subject Function
// @route                 GET api/v1/class/:id/subjects
// @access                Private
const getsubjectofclass = asyncHandler(async (req, res) => {
    if (req.isAdmin) {
        try {
            const classId = req.params.id;

            if (classId.length !== 24) {
                return res.status(500).json({
                    error: "Invalid ID",
                });
            }
            const foundClass = await Class.findById(classId).populate("subjects");
            if (!foundClass) {
                return res.status(500).json({
                    error: "Class not found",
                });
            }
            const subjects = foundClass.subjects;
            return res.status(200).json({
                data: subjects,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(403).json({ message: "Only admin can see subjects" });
    }
});
const deleteclass = asyncHandler(async (req, res) => {
    // if (req.isAdmin) {
    //     const clas = await Class.findById(studentId);
    //   if (!clas) {
    //     res.status(404).json({
    //       message: "Class not found",
    //     });
    //     return;
    //   }
    //   await
    // }
    // else {
    //     res.status(403).json({ message: "Only admin can delete class" });
    // }
});

module.exports = {
    createclass,
    deleteclass,
    createsubject,
    getsubjectofclass,
};
