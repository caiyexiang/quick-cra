import Koa from "koa";
import KoaBodyParser from "koa-bodyparser";
import router from "./routes";

const app = new Koa();

app
  .use(
    async (ctx, next): Promise<void> => {
      const start = Date.now();
      await next();
      const end = Date.now();
      console.log(`处理时间：${end - start}ms`);
    }
  )
  .use(router.routes())
  .use(router.allowedMethods())
  .use(KoaBodyParser())
  .listen(5000);
console.log("server run at http://localhost:5000");
