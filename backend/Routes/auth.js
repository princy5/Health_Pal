// import express from "express";
// import { register, login } from "../Controllers/authController.js";

// const router = express.Router;

// router.post("/register", register);
// router.post("/login", login);

// export default router;
import express from "express";
import { register, login } from "../Controllers/authController.js";

const router = express.Router(); // Correctly creating a new router instance

router.post("/register", register);
router.post("/login", login);

export default router;
