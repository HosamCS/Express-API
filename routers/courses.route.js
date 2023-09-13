const express = require("express");
const coursesController = require("../controllers/courses.controller");
const { validatorScheme } = require("../middlewares/validationSchema");
const router = express.Router();




// compine same routes
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(validatorScheme() ,coursesController.createCourse);


router.route("/:courseId")
 .get(coursesController.getCourseById)
 .patch(coursesController.updateCourse)
 .delete(coursesController.deleteCourse)



module.exports = router;
