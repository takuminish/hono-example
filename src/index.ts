import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

// GET 第一引数にpath
app.get("/", (c) => {
  return c.json({ result: "get" }, 200);
});

app.get("/:id", (c) => {
  return c.json({ result: c.req.param("id") });
});

app.post("/", (c) => {
  return c.json({ result: "post" }, 201);
});

app.get("/not-found", (c) => {
  return c.json({ result: "not-found" }, 404);
});

app.post("/conflict", (c) => {
  return c.json({ result: "conflict" }, 409);
});

const nestApp = new Hono();
nestApp.get("/", (c) => {
  return c.json({ result: "nest" });
});

// zodを使用したバリデーションには@hono/zod-validatorを使用する
const zodValidatorApp = new Hono();
const schema = z.object({
  id: z.string().min(6, { message: "6桁以上にしてください" }),
});
// validation successの場合
// {
//   "data": {
//       "id": "123456"
//   },
//   "success": true
// }
// validation errorの場合
// {
//   "data": {
//       "id": "e"
//   },
//   "success": false,
//   "error": {
//       "issues": [
//           {
//               "code": "too_small",
//               "minimum": 6,
//               "type": "string",
//               "inclusive": true,
//               "exact": false,
//               "message": "6桁以上にしてください",
//               "path": [
//                   "id"
//               ]
//           }
//       ],
//       "name": "ZodError"
//   }
// }
zodValidatorApp.post(
  "/",
  zValidator("json", schema, (result, c) => {
    return c.json(result);
  })
);

// routeはnest構造にできる
app.route("/nest", nestApp).route("/zod", zodValidatorApp);

export default app;
