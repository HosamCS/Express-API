const { body, validationResult } = require("express-validator"); // middleware function
const {SUCCESS , FAIL  , ERROR } = require('../utils/statusText')
const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {

  console.log(req.query);
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;

  const skip = (page - 1) * limit;

  const courses = await Course.find({} , {"__v":false}).limit(limit).skip(skip);  
  res.json({ status: SUCCESS, data: courses });
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      res.status(404).json({ status: FAIL , data:{course:null}});
    }
    return res.json({ status: SUCCESS, data: course });
  } catch (error) {
    res.status(400).json({status: ERROR , data:{message:"Unable to communicate with database"}});
  }
};

const createCourse = async (req, res) => {
  // console.log(req);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array()[0].msg, field: errors.array()[0].path });
  }

  console.log(req.body);
  const newCourse = Course(req.body);
  await newCourse.save();
  res.status(201).json({ status: SUCCESS, data: newCourse }); // show the new course only
};

const updateCourse = async (req, res) => {
  try {
    const updateCourse = await Course.updateOne(
      { _id: req.params.courseId },
      { $set: { ...req.body } }
    );
    if (!updateCourse) {
      res.status(404).json({ msg: "Course not found 404 " });
    }
    res.status(200).json({ status: SUCCESS, data: updateCourse });
  } catch (error) {
    res.status(400).json({ status: ERROR, data:{message:error.message}});
  }
};

const deleteCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const data = await Course.deleteOne({ _id: courseId });
  res.status(200).json({ status: SUCCESS, data: null });
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
