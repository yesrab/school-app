// const countDocs = require("../libs/countDocs");
// const Classes = require("../model/classSchema");
// const teachers = require("../model/teacherSchema");

import countDocs from "../libs/countDocs.js";
import Classes from "../model/classSchema.js";
import teachers from "../model/teacherSchema.js";

const test = (req, res) => {
  res.json({ message: "class route hit" });
};
const addAllClasses = async (req, res) => {
  const classArray = req.body;
  // console.log(classArray);
  await Classes.deleteMany({});
  const result = [];
  for (let classesObj of classArray) {
    // console.log(classesObj);

    const data = await Classes.create(classesObj);
    result.push(data);
  }
  res.status(201).json({ result });
};

const addClass = async (req, res) => {
  const {
    classDetails,
    studentMemberFee,
    classTeacher,
    classCapacity,
    duration,
    frequency,
    startDate,
    endDate,
  } = req.body;
  const createdClass = await Classes.create({
    classDetails,
    studentMemberFee,
    classTeacher: {},
    classCapacity,
    duration,
    frequency,
    startDate,
    endDate,
  });
  res.status(201).json(createdClass);
};

const classCount = async (req, res) => {
  const count = await countDocs(Classes);
  res.status(200).json({ count });
};

const allClasses = async (req, res) => {
  const classes = await Classes.find({});
  const allTeachers = await teachers.find(
    {},
    {
      gender: 0,
      DOB: 0,
      emailId: 0,
      mobileNumber: 0,
      homeAddress: 0,
      salary: 0,
      KYC_Details: 0,
      assignedClasses: 0,
      teacherType: 0,
    }
  );
  res.status(200).json({ classes, allTeachers });
};

const assignTeacher = async (req, res) => {
  const { classId, teacherId } = req.body;
  console.log(classId, teacherId);
  if (req.method === "PATCH") {
    console.log("patching add teacher");
    const classInfo = await Classes.findById(classId);
    const teacherInfo = await teachers.findById(teacherId);
    const updatedClass = await Classes.findByIdAndUpdate(
      classId,
      {
        $set: {
          classTeacher: {
            teacherId: teacherId,
            name: teacherInfo.fullName,
          },
        },
      },
      { new: true }
    );

    const updatedTeacher = await teachers.findById(teacherId);
    if (!updatedTeacher.assignedClasses) {
      updatedTeacher.assignedClasses = [];
    }
    updatedTeacher.assignedClasses.push({
      classId: classId,
      className: classInfo.className,
    });
    await updatedTeacher.save();
    return res.status(200).json({ updatedClass, updatedTeacher });
  } else if (req.method === "DELETE") {
    console.log("triggered delete method");
    const updatedClass = await Classes.findByIdAndUpdate(
      classId,
      { $set: { classTeacher: {} } }, // Set classTeacher to an empty object
      { new: true }
    );
    const updatedTeacher = await teachers.findById(teacherId);
    if (updatedTeacher?.assignedClasses?.length) {
      updatedTeacher.assignedClasses = updatedTeacher?.assignedClasses?.filter(
        (item) => {
          return item.classId.toString() !== classId.toString();
        }
      );
      await updatedTeacher.save();
    }
    return res.status(200).json({ updatedClass, updatedTeacher });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export { test, addAllClasses, addClass, classCount, allClasses, assignTeacher };
