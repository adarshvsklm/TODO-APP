import express from 'express';
import { add, deleteItem, edit, list } from './Controller.js';
const router = express.Router()

 
router.post('/add',add)
router.get('/list',list)
router.patch('/edit',edit)
router.delete('/delete',deleteItem)


export default router