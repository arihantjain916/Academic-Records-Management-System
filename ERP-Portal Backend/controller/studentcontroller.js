const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const Student = require("../components/models/studentinfo");
const User = require("../components/models/user");
const Marks = require("../components/models/marks")

//@description           Insert the info of the student
//@route                 POST api/v1/student/register
//@access                Private
const registerStudent = asyncHandler(async (req, res) => {
  if (req.isAdmin) {
    const { firstname, lastname, city, state, email, phonenumber, password, year, classname, rollno } =
      req.body;

    // Check if the student email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Student email already exists" });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      try {
        const user = new User({
          name: `${firstname} ${lastname}`,
          email,
          password: hash,
          type: "user",
        });
        await user.save();
        const token = generateToken(user._id, user.type);
        const student = new Student({
          firstname,
          lastname,
          city,
          state,
          email,
          phonenumber,
          year,
          classname,
          rollno,
          user: user._id,
        });
        await student.save();
        res.status(201).json({
          data: {
            user: {
              token,
            },
            student,
          },
          Message: "Student Register Successfully",
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(403).json({ message: "Only admin can register students" });
  }
});

//@description           Update Student Profile
//@route                 GET api/v1/user/profile/:id
//@access                Private

const UpdateUserProfile = asyncHandler(async (req, res) => {
  if (req.isAdmin) {
    try {
      const id = req.params.id;
      const updateFields = req.body;
      const updatedStudent = await Student.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true }
      );

      if (updatedStudent) {
        const { user, ...data } = updatedStudent.toObject();
        res.status(200).json({
          message: "Data Updated Successfully",
          data: data,
        });
      } else {
        res.status(500).json({
          message: "Error: Data not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  } else {
    res.status(403).json({ message: "Only admin can update student details" });
  }
});

// @description           Delete Student Function
// @route                 POST api/v1/user/delete/:id
// @access                Private
const deleteStudent = asyncHandler(async (req, res) => {
  if (req.isAdmin) {
    try {
      const studentId = req.params.id;
      const student = await Student.findById(studentId);
      if (!student) {
        res.status(404).json({
          message: "Student not found",
        });
        return;
      }

      const id = student.user;
      await Student.deleteOne({ _id: studentId });

      const deleteUserResult = await User.deleteOne({ _id: id });

      if (deleteUserResult.deletedCount === 1) {
        res.json({
          message: "Student and associated user deleted successfully",
        });
      } else {
        res.json({
          message: "Unable to delete student and associated user in try block",
        });
      }
    } catch (error) {
      res
        .status(400)
        .json({ error: "Unable to delete student and associated user" });
    }
  } else {
    res.status(403).json({ message: "Only admin can delete students" });
  }
});

//@description           Student Profile
//@route                 GET api/v1/user/profile
//@access                Private
const getUserProfile = asyncHandler(async (req, res) => {
  if(req.isAdmin || req.isStudent){
    try {
      const id = req.body.id;
      const student = await Student.findById(id)
  
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      const marks = await Marks.find({ student: id }).populate('subject')
      if (!marks) {
        marks = {message: "Marks not found"}
        return res.status(404).json({ message: "Marks not found" });
      }
      return res.status(200).json({
        id: student._id,
        name: student.firstname + student.lastname,
        city: student.city,
        phonenumber: student.phonenumber,
        email: student.email,
        year: student.year,
        class: student.classname,
        marks
      });
    } catch (error) {
      console.error(error);
      // res.status(500).json({ message: "Server error" });
    }
  }
  else{
    res.status(403).json({ message: "Only admin or student can access students" });
  }
  
});

module.exports = {
  registerStudent,
  getUserProfile,
  UpdateUserProfile,
  deleteStudent,
};
