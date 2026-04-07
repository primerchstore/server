import { toNodeHandler } from "better-auth/node";
import express from "express";
import { auth } from "./libs/auth.js";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import publicRoutes from "./routes/public.route.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use("/api", publicRoutes);
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorMiddleware);

export default app;
