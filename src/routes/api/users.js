const express = require('express');

const router = express.Router();

const { authMiddleware } = require('../../middlewares/authMiddleware');

const { subscriptionSchema } = require('../../schemas/validationUserSchema');
const { userSchema } = require('../../schemas/validationUserSchema');
const { validateBody } = require('../../middlewares/validateBody');

const {
  signupController,
  loginController,
  logoutController,
} = require('../../controllers/authController');
const {
  getCurrentController,
  updateSubscriptionController,
} = require('../../controllers/usersController');

const TryCatchWrapper = require('../../helpers/TryCatchWrapper');

router.post(
  '/register',
  validateBody(userSchema),
  TryCatchWrapper(signupController)
);

router.post(
  '/login',
  validateBody(userSchema),
  TryCatchWrapper(loginController)
);

router.get('/logout', authMiddleware, TryCatchWrapper(logoutController));

router.get('/current', TryCatchWrapper(getCurrentController));

router.patch(
  '/',
  [authMiddleware, validateBody(subscriptionSchema)],
  TryCatchWrapper(updateSubscriptionController)
);

module.exports = router;
