import { Hono } from "hono";
import zodValidatorApp from "./zod-validator";

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

// routeはnest構造にできる
app.route("/nest", nestApp).route("/zod", zodValidatorApp);

export default app;
