const express = require('express');

const router = express.Router();

const { authMiddleware } = require('../../middlewares/authMiddleware');
const { uploadMiddleware } = require('../../middlewares/uploadMiddleware');

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
  updateAvatarController,
} = require('../../controllers/usersController');

const ctrlWrapper = require('../../helpers/tryCatchWrapper');

router.post('/signup', validateBody(userSchema), ctrlWrapper(signupController));

router.post('/login', validateBody(userSchema), ctrlWrapper(loginController));

router.get('/logout', authMiddleware, ctrlWrapper(logoutController));

router.get('/current', ctrlWrapper(getCurrentController));

router.patch(
  '/',
  [authMiddleware, validateBody(subscriptionSchema)],
  ctrlWrapper(updateSubscriptionController)
);

router.patch(
  '/avatars',
  [authMiddleware, uploadMiddleware.single('avatar')],
  ctrlWrapper(updateAvatarController)
);

module.exports = router;
