import { Router } from "express";
import { body, param } from "express-validator";
import { LockController } from "../controllers/LockController";
import { handleInputsErrors } from "../middleware/validation";
import { lockExists } from "../middleware/Lock";
import { validateUserExists } from "../middleware/User";

const router = Router();

router.param('userId', validateUserExists);

router.post('/:userId/locks',
    body('ubicationLock')
        .notEmpty()
        .withMessage('Ubication lock is required'),
    body('configurationLock')
        .notEmpty()
        .withMessage('Configuration lock is required'),
    handleInputsErrors,
    LockController.createLock
);

router.get('/:userId/locks', LockController.getAllLocks);

router.param('lockId', lockExists);
router.param('userId', validateUserExists);
router.get('/:userId/locks/:lockId',
    param('lockId')
        .isMongoId()
        .withMessage('Invalid lock id'),
    handleInputsErrors,
    LockController.getLockById);

router.put('/:userId/locks/:lockId',
    param('lockId')
        .isMongoId()
        .withMessage('Invalid lock id'),
    body('ubicationLock')
        .notEmpty()
        .withMessage('Ubication lock is required'),
    body('configurationLock')
        .notEmpty()
        .withMessage('Configuration lock is required'),
    handleInputsErrors,
    LockController.updateLockById);

router.delete('/:userId/locks/:lockId',
    param('lockId')
        .isMongoId()
        .withMessage('Invalid lock id'),
    handleInputsErrors,
    LockController.deleteLockById);

router.put('/:userId/locks/:lockId/statusLock',
    param('lockId')
        .isMongoId()
        .withMessage('Invalid lock id'),
    body('statusLock')
        .notEmpty()
        .withMessage('Status lock is required'),
    handleInputsErrors,
    LockController.updateLockStatusById);

router.post('/:userId/locks/:lockId/logs',
    param('lockId')
        .isMongoId()
        .withMessage('Invalid lock id'),
    body('acceso')
        .notEmpty()
        .withMessage('Acceso is required'),
    body('tipo')
        .notEmpty()
        .withMessage('Tipo is required'),
    body('usuario')
        .notEmpty()
        .withMessage('Usuario is required'),
    body('hora')
        .notEmpty()
        .withMessage('Hora is required'),
    body('dia')
        .notEmpty()
        .withMessage('Dia is required'),
    handleInputsErrors,
    LockController.addLogToLock);

router.get('/:userId/locks/:lockId/logs',
    param('lockId')
        .isMongoId()
        .withMessage('Invalid lock id'),
    handleInputsErrors,
    LockController.getAllLogsFromLock);

export default router;
