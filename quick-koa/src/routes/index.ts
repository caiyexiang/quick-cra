import Router from "koa-router";
import demo from "./demo";

const router = new Router();

router.use("/prefix", demo.routes(), demo.allowedMethods());

export default router;
