const express = require('express');

const router = express.Router();

const { authMiddleware } = require('../../middlewares/authMiddleware');
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware');

const {
  userSchema,
  subscriptionSchema,
  resendEmailSchema,
} = require('../../schemas/validationUserSchema');
const { validateBody } = require('../../middlewares/validateBody');

const {
  signupController,
  verificationEmailController,
  resendEmailController,
  loginController,
  logoutController,
} = require('../../controllers/authController');
const {
  getCurrentController,
  updateSubscriptionController,
  updateAvatarController,
} = require('../../controllers/usersController');

const tryCatchWrapper = require('../../helpers/tryCatchWrapper');

router.post(
  '/signup',
  validateBody(userSchema),
  tryCatchWrapper(signupController)
);

router.get(
  '/verify/:verificationToken',
  tryCatchWrapper(verificationEmailController)
);

router.post(
  '/verify',
  validateBody(resendEmailSchema),
  tryCatchWrapper(resendEmailController)
);

router.post(
  '/login',
  validateBody(userSchema),
  tryCatchWrapper(loginController)
);

router.get('/logout', authMiddleware, tryCatchWrapper(logoutController));

router.get('/current', tryCatchWrapper(getCurrentController));

router.patch(
  '/',
  [authMiddleware, validateBody(subscriptionSchema)],
  tryCatchWrapper(updateSubscriptionController)
);

router.patch(
  '/avatars',
  [authMiddleware, uploadMiddleware.single('avatar')],
  tryCatchWrapper(updateAvatarController)
);

module.exports = router;
