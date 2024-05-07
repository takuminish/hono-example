import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

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

export default zodValidatorApp;