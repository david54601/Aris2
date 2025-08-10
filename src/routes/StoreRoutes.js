import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  listStores,
  selectStore,
  registerStore,
  getStoreDetails,
  updateStore,
  deleteStore
} from '../controllers/TiendaController.js';

const router = express.Router();

router.get('/', verifyToken, listStores);
router.post('/register', verifyToken, registerStore);
router.get('/details', verifyToken, getStoreDetails);
router.put('/update', verifyToken, updateStore);
router.delete('/:id', verifyToken, deleteStore);
router.post('/selectStore/:id', verifyToken, selectStore);

export default router;
