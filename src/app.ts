import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlware/globalErrorHandler";
import router from "./app/routes";
import notFound from "./app/middlware/notFound";

const app: Application = express();

// parsers

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000"] }));

// test route
const testRoute = (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Done",
  });

  // Promise.reject()
};
app.get("/", testRoute);

// main route
app.use("/api", router);

// 404 Route handler for unmatched or not found routes
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
