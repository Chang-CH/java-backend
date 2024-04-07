import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", function (_req: any, res: any, next: any) {
  res.render("index", { title: "Express" });
});

export default router;
