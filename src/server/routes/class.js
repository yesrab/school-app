// const express = require("express");
import express from "express";

const router = express.Router();
import {
  test,
  addAllClasses,
  addClass,
  classCount,
  allClasses,
  assignTeacher,
} from "../controller/class.js";

router.route("/test").get(test);
router.route("/addAllClasses").post(addAllClasses);
router.route("/addClass").post(addClass);
router.route("/allClass").get(allClasses);
router.route("/count").get(classCount);
router.route("/setTeacher").patch(assignTeacher).delete(assignTeacher);

export default router;
