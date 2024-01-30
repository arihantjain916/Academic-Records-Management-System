const Marks = require("../components/models/marks");
const Student = require("../components/models/studentinfo");
const Subject = require("../components/models/subject");
const asyncHandler = require("express-async-handler");

// @description           Create marks Function
// @route                 POST api/v1/marks/:id/add
// @access                Private
const createmarksofstudent = asyncHandler(async (req, res) => {
  if (req.isAdmin) {
    try {
      const subjectId = req.params.id;
      const { marks, studentName } = req.body;

      if (subjectId.length != 24) {
        return res.status(500).json({
          error: "Invalid Id ",
        });
      }
      const student = await Student.findOne({ name: studentName });
      const subject = await Subject.findById(subjectId);
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const newMarks = new Marks({
        subject: subjectId,
        student: student._id,
        marks,
      });
      await newMarks.save();
      res.status(201).json({ message: "Marks added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Only admin can enter marks" });
  }
});

// @description           Get marks Function
// @route                 GET api/v1/marks/:id/marks
// @access                Private
const getmarks = asyncHandler(async (req, res) => {
  if (req.isAdmin || req.isStudent) {
    try {
      let subId = req.params.id;
      const studId = req.body.id;
      if (subId.length != 24) {
        return res.status(500).json({
          error: "Invalid SUbject Id ",
        });
      }
      let subject = await Subject.findById(subId);
      let student = await Student.findById(studId);
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      const marks = await Marks.findOne({ student: studId, subject: subId });
      if (!marks) {
        return res.status(404).json({ message: "Marks not found" });
      }
      const subject1 = await Subject.findById(marks.subject);
      const student1 = await Student.findById(marks.student);
      return res.status(200).json({
        data: {
          subject: subject1.name,
          student: student1.firstname + " " + student1.lastname,
          marks: marks.marks,
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Only admin can enter marks" });
  }
});

module.exports = {
  createmarksofstudent,
  getmarks,
};
