import express from "express";
import { forgetPassword, createUser, getUsers, updateUser, DeleteUsers, login } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', DeleteUsers);
router.post('/login', login);
router.post('/forgetpass', forgetPassword);


export default router;

