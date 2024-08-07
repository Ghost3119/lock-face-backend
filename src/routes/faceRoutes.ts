import { Router } from 'express';
import { body, param } from 'express-validator';
import { FaceController } from '../controllers/FaceController';
import { handleInputsErrors } from '../middleware/validation';

const router = Router();

// Crear Cara
router.post('/:userId/:lockId',
    param('userId')
        .isMongoId()
        .withMessage('Invalid user id'),
    param('lockId')
        .isMongoId()
        .withMessage('Invalid lock id'),
    body('faceId')
        .notEmpty()
        .withMessage('Face ID is required'),
    body('features')
        .isArray({ min: 10, max: 10 })
        .withMessage('Features must be an array of 10 numbers'),
    handleInputsErrors,
    FaceController.createFace
);

// Obtener Todas las Caras
router.get('/', FaceController.getAllFaces);

// Obtener Cara por ID
router.get('/:faceId',
    param('faceId')
        .isMongoId()
        .withMessage('Invalid face id'),
    handleInputsErrors,
    FaceController.getFaceById
);

// Actualizar Cara por ID
router.put('/:faceId',
    param('faceId')
        .isMongoId()
        .withMessage('Invalid face id'),
    body('faceId')
        .notEmpty()
        .withMessage('Face ID is required'),
    body('features')
        .isArray({ min: 10, max: 10 })
        .withMessage('Features must be an array of 10 numbers'),
    handleInputsErrors,
    FaceController.updateFaceById
);

// Eliminar Cara por ID
router.delete('/:faceId',
    param('faceId')
        .isMongoId()
        .withMessage('Invalid face id'),
    handleInputsErrors,
    FaceController.deleteFaceById
);

// Obtener Caras por Usuario
router.get('/user/:userId',
    param('userId')
        .isMongoId()
        .withMessage('Invalid user id'),
    handleInputsErrors,
    FaceController.getFacesByUser
);

// Obtener Caras por Cerradura
router.get('/lock/:lockId',
    param('lockId')
        .isMongoId()
        .withMessage('Invalid lock id'),
    handleInputsErrors,
    FaceController.getFacesByLock
);

// Buscar Caras por Características
router.post('/search',
    body('features')
        .isArray({ min: 10, max: 10 })
        .withMessage('Features must be an array of 10 numbers'),
    handleInputsErrors,
    FaceController.searchFacesByFeatures
);

export default router;
