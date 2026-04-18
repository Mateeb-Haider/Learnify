import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./route/user.route";
import courseRouter from "./route/course.route";
import orderRouter from "./route/order.route";
import notificationRouter from "./route/notification.route";
import analyticsRouter from "./route/analytics.route";
import layoutRouter from "./route/layout.route";
import { rateLimit } from 'express-rate-limit'


export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors =>cross origin resource sharing
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Explicitly handle preflight requests
app.options('*', cors());



// routes
app.use('/api/v1', userRouter, courseRouter, orderRouter, notificationRouter, analyticsRouter, layoutRouter);

// Api request limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
	
})


// test api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working",
    });
});

// unknown routes — use a middleware that doesn't rely on route pattern parsing
app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});
app.use(limiter)

app.use(ErrorMiddleware);
