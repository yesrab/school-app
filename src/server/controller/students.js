// const students = require("../model/studentSchema");
// const classes = require("../model/classSchema.js");
// const countDocs = require("../libs/countDocs.js");

import students from "../model/studentSchema.js";
import classes from "../model/classSchema.js";
import countDocs from "../libs/countDocs.js";

const test = (req, res) => {
  res.json({ lol: "lol" });
};

const addStudent = async (req, res) => {
  const {
    fullName,
    gender,
    DOB,
    emailId,
    mobileNumber,
    homeAddress,
    guardians,
    totalFeePaid,
    enrolledClass,
    enrollmentStatus,
  } = req.body;

  guardians.forEach((guardian) => {
    if (guardian.isParent === "on") {
      guardian.isParent = true;
    } else if (guardian.isParent === "no") {
      guardian.isParent = false;
    }
  });

  const data = await students.create({
    fullName,
    gender,
    DOB,
    emailId,
    mobileNumber,
    homeAddress,
    guardians,
    totalFeePaid,
    enrolledClass,
    enrollmentStatus,
  });

  res.status(201).json({ data, success: "Student added" });
};

const addAllStudents = async (req, res) => {
  const studentArr = req.body;
  await students.deleteMany({});
  const results = [];
  for (let student of studentArr) {
    const data = await students.create(student);
    results.push(data);
  }
  res.status(201).json({ results });
};

const studentCount = async (req, res) => {
  const numberOfStudents = await countDocs(students);
  res.status(200).json({ count: numberOfStudents });
};

const getStudents = async (req, res) => {
  const allStudents = await students.find(
    {},
    { guardians: 0, homeAddress: 0, emailId: 0, mobileNumber: 0 }
  );
  const studentData = JSON.parse(JSON.stringify(allStudents));
  for (let data of studentData) {
    if (data.enrolledClass) {
      data.enrolledClass = "none";
    } else {
      data.enrolledClass = "none";
    }
  }
  res.status(200).json({ studentData });
};

const getStudentDetails = async (req, res) => {
  const id = req.params.studentId;
  const studentDetail = await students.findById(id);
  const classesEnrolled = await classes.findOne({ "students.studentId": id });
  res.status(200).json({ studentDetail, classesEnrolled });
};

const changeStatus = async (req, res) => {
  const { status, studentId } = req.body;
  const student = await students.findById(studentId);
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  if (student) {
    student.enrollmentStatus = status;
    await student.save();
  } else {
    return res.status(404).json({
      status: "Error",
    });
  }
  return res.status(200).json({
    status: "success",
    messasge: `set status to ${status}`,
  });
};

const changeClass = async (req, res) => {
  const { Classid, studentId, currentClassId } = req.body;
  const student = await students.findById(studentId);
  const newClassDetails = await classes.findById(Classid);
  if (currentClassId) {
    const currentClassDetails = await classes.findById(currentClassId);
    // Filter out the student from the current class
    currentClassDetails.students = currentClassDetails.students.filter(
      (s) => s.studentId.toString() !== studentId.toString()
    );
    await currentClassDetails.save();
  }
  if (newClassDetails) {
    // Add student to the new class
    newClassDetails.students.push({
      studentName: student.fullName,
      studentId: student._id,
    });
    // Update student member fee based on new class
    student.totalFeePaid = newClassDetails.studentMemberFee; // Edit: Update the fee
    await student.save();
    await newClassDetails.save();
    return res.status(200).json({
      status: "Success",
      message: `Student moved to new class ${newClassDetails.className}`,
    });
  } else {
    return res.status(404).json({
      status: "Error",
      message: "New class not found",
    });
  }
};

const removeStudent = async (req, res) => {
  const id = req.params.studentId;
  const removedStudent = await students.deleteOne({ _id: id });
  res.status(200).json({
    status: "Success",
    removedStudent,
  });
};

export {
  test,
  addAllStudents,
  addStudent,
  studentCount,
  getStudents,
  getStudentDetails,
  changeStatus,
  changeClass,
  removeStudent,
};
