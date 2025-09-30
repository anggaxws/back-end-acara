import express from "express";
import dummyController from '../controllers/dummmy.controllers';
const router = express.Router();

router.get('/dummy', dummyController.dummy);


export default router;