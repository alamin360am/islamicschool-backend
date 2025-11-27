import express from 'express';
import { adminOnly, protect } from '../middlewares/auth.js';
import {
  enrollCourse,
  getAllEnrollments,
  getEnrollmentByCourse,
  getLearningProgress,
  markLectureComplete,
  myEnrollments,
} from '../controller/enrollmentController.js';

const enrollmentRouter = express.Router();

enrollmentRouter.post('/', enrollCourse);

enrollmentRouter.get('/me', protect, myEnrollments);

enrollmentRouter.get('/', adminOnly, getAllEnrollments);

enrollmentRouter.get('/course/:courseId', protect, getEnrollmentByCourse);
enrollmentRouter.post('/:enrollmentId/complete-lecture', protect, markLectureComplete);
enrollmentRouter.get('/progress', protect, getLearningProgress);

export default enrollmentRouter;
