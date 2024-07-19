import { Router } from 'express';
import { body, param } from 'express-validator';
import { UserController } from '../controllers/UserController';
import { handleInputsErrors } from '../middleware/validation';
import { validateUserExists } from '../middleware/User';

const router = Router();

//Crear Usuario
router.post('/',
    body('nameUser')
        .notEmpty()
        .withMessage('User name is required'),
    body('numberUser')
        .notEmpty()
        .withMessage('Number user is required'),
    body('emailUser')
        .notEmpty()
        .withMessage('Email user is required')
        .isEmail(),
    body('passwordUser')
        .notEmpty()
        .withMessage('Password user is required'),
    body('roleUser')
        .notEmpty()
        .withMessage('Role user is required'),
    body('photoUser')
        .notEmpty()
        .withMessage('Photo user is required'),
    handleInputsErrors,
    UserController.createUser
);

//Obtener todos los usuarios
router.get('/', UserController.getAllUsers);

//Obtener usuario por id
router.get('/:userId',
    param('userId')
        .isMongoId()
        .withMessage('Invalid user id'),
    handleInputsErrors,
    UserController.getUserById);

//Actualizar usuario por id
router.put('/:userId',
    param('userId')
        .isMongoId()
        .withMessage('Invalid user id'),
    body('nameUser')
        .notEmpty()
        .withMessage('User name is required'),
    body('numberUser')
        .notEmpty()
        .withMessage('Number user is required'),
    body('emailUser')
        .notEmpty()
        .withMessage('Email user is required')
        .isEmail(),
    body('passwordUser')
        .notEmpty()
        .withMessage('Password user is required'),
    body('roleUser')
        .notEmpty()
        .withMessage('Role user is required'),
    body('photoUser')
        .notEmpty()
        .withMessage('Photo user is required'),
    handleInputsErrors,
    UserController.updateUserById);

//Eliminar usuario por id
router.delete('/:userId',
    param('userId')
        .isMongoId()
        .withMessage('Invalid user id'),
    handleInputsErrors,
    validateUserExists,
    UserController.deleteUserById);

router.post('/login',
    body('emailUser')
        .notEmpty()
        .withMessage('Email user is required')
        .isEmail(),
    body('passwordUser')
        .notEmpty()
        .withMessage('Password user is required'),
    handleInputsErrors,
    UserController.loginUser
);


export default router;