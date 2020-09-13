import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  // 注销就是将 req.session 设置成null
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
