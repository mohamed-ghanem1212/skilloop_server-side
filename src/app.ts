import { Request, Response } from "express";
import express from "express";
import { connect } from "mongoose";
import { connectDb } from "./db/connect";
import SwaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import cors from "cors";
import * as Routes from "./api/routes/index.routes";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import { errorHandler } from "./api/middleware/errorHandler";
import { initSocket } from "./socket";
import cookieParser from "cookie-parser";
const port = 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",

    credentials: true,
  }),
);

const server = http.createServer(app);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
const theme = new SwaggerTheme();
const SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SkillSwap API",
      version: "1.0.0",
      description: "API documentation for SkillSwap application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/api/routes/*.ts"],
};

export const io = initSocket(server);
app.use(
  "/api-docs",
  SwaggerUi.serve,
  SwaggerUi.setup(swaggerJsDoc(SwaggerOptions), {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  }),
);
app.use("/api/v1/users", Routes.userRouter);
app.use("/api/v1/skills", Routes.skillRouter);
app.use("/api/v1/skillOffers", Routes.skillOfferRouter);
app.use("/api/v1/messages", Routes.messageRouter);
app.use("/api/v1/offerRegisters", Routes.offerRegisters);
app.use("/api/v1/chat", Routes.chatRoomRouter);
app.use(errorHandler);

const startServer = () => {
  connectDb().then(() => {
    server.listen(port, () => {
      console.log(
        `Server is running at http://localhost:${process.env.PORT as string} \n${process.env.CLOUDINARY_URL}`,
      );
    });
  });
};
startServer();
