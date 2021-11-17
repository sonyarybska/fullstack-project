const router = require('express').Router();

const {DRIVER} = require('../constants/user-type.enum');
const {getUsers, getUser, postUser, updateUser, deleteUser} = require('../controllers/user.controller');
const {isUserIdValid, isBodyValid, isExistEmail, checkUserType} = require('../middleware/user.middleware');
const {updateUserValidator, createUserValidator} = require('../validators/user_validator');

router.get('/', getUsers);
router.post('/',isBodyValid(createUserValidator,'create'), isExistEmail,postUser);

router.get('/:id', isUserIdValid, getUser);
router.put('/:id', isUserIdValid, isBodyValid(updateUserValidator, 'update'), updateUser);
router.delete('/:id', isUserIdValid, checkUserType([DRIVER]), deleteUser);

module.exports = router;
