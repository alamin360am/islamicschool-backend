import express from 'express';
import {
  addCouponToCourse,
  addCourseCategory,
  createCourse,
  createLecture,
  deleteCoupon,
  deleteCourse,
  deleteCourseCategory,
  deleteLecture,
  deleteResource,
  getCourseById,
  getCourseCategory,
  getCourseDetails,
  getCourses,
  getCourseWithLectures,
  getFeaturedCourses,
  getLecture,
  getLecturesByCourse,
  getPublishCourses,
  updateCoupon,
  updateCourse,
  updateLecture,
} from '../controller/courseController.js';
import { adminOnly, protect, teacherOrAdmin } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const courseRouter = express.Router();

// Course CRUD
courseRouter.post(
  '/',
  protect,
  adminOnly,
  upload.single('thumbnail'),
  createCourse
);
courseRouter.post('/courseCategory', protect, adminOnly, addCourseCategory);
courseRouter.get('/', getCourses);
courseRouter.get('/publicCourse', getPublishCourses);
courseRouter.get('/featuredCourse', getFeaturedCourses);
courseRouter.get('/courseDetails/:id', getCourseDetails);
courseRouter.get('/courseCategory', getCourseCategory);
courseRouter.get('/:id', protect, adminOnly, getCourseById);
courseRouter.get('/:id/lectures', protect, getCourseWithLectures);
courseRouter.put(
  '/:id',
  protect,
  adminOnly,
  upload.single('thumbnail'),
  updateCourse
);
courseRouter.delete('/:id', protect, adminOnly, deleteCourse);
courseRouter.delete(
  '/courseCategory/:id',
  protect,
  adminOnly,
  deleteCourseCategory
);

// Lecture CRUD (under course)
courseRouter.post(
  '/lectures',
  protect,
  teacherOrAdmin,
  upload.fields([{ name: 'resources', maxCount: 10 }]),
  createLecture
);

courseRouter.get(
  '/lectures/course/:courseId',
  protect,
  teacherOrAdmin,
  getLecturesByCourse
);

courseRouter.get('/lectures/:id', protect, teacherOrAdmin, getLecture);

courseRouter.put(
  '/lectures/:id',
  protect,
  teacherOrAdmin,
  upload.fields([{ name: 'resources', maxCount: 10 }]),
  updateLecture
);

courseRouter.delete('/lectures/:id', protect, teacherOrAdmin, deleteLecture);

courseRouter.delete(
  '/lectures/:lectureId/resources/:resourceId',
  protect,
  teacherOrAdmin,
  deleteResource
);

// Coupon CRUD (under course)
courseRouter.post('/:id/coupons', protect, adminOnly, addCouponToCourse);
courseRouter.put('/coupons/:couponId', protect, adminOnly, updateCoupon);
courseRouter.delete('/coupons/:couponId', protect, adminOnly, deleteCoupon);

export default courseRouter;
