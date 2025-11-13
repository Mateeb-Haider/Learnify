import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";
import { title } from "process";
import layoutRouter from "../route/layout.route";


export const createLayout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;
        const isTypeExist = await LayoutModel.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler(`${type} already exist`, 400));
        }
        if (type === "Banner") {
            const { image, title, subTitle } = req.body;

            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
            });
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle
            }
            await LayoutModel.create(banner)
        }
        if (type === "FAQ") {
            const { faq } = req.body;

            const faqItem = await Promise.all(
                faq.map(async (item: any) => {
                    return {
                        question: item.question,
                        answer: item.answer
                    };
                })
            );
            await LayoutModel.create({ type: "FAQ", faq: faqItem })
        }

        if (type === "Categories") {
            const { categories } = req.body;
            const cetegoriesItems = await Promise.all(
                categories.map(async (item: any) => {
                    return {
                        title: item.title,
                    };
                })
            );
            await LayoutModel.create({ type: "Categories", categories: cetegoriesItems });

        }

        res.status(200).json({
            success: true,
            message: "Layout Created Successfully"
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});


// Edit LayOut


export const editLayout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;

        if (type === "Banner") {
            const bannerData: any = await LayoutModel.findOne({ type: "Banner" });

            const { image, title, subTitle } = req.body;

            await cloudinary.v2.uploader.destroy(bannerData?.image?.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
            });
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle
            }
            await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });

        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const FaqItem = await LayoutModel.findOne({ type: "FAQ" });

            const faqItem = await Promise.all(
                faq.map(async (item: any) => {
                    return {
                        question: item.question,
                        answer: item.answer
                    };
                })
            );
            await LayoutModel.findByIdAndUpdate(FaqItem?._id, { type: "FAQ", faq: faqItem })
        }

        if (type === "Categories") {
            const { categories } = req.body;
            const CategoryItem = await LayoutModel.findOne({ type: "Categories" });

            const cetegoriesItems = await Promise.all(
                categories.map(async (item: any) => {
                    return {
                        title: item.title,
                    };
                })
            );
            await LayoutModel.findByIdAndUpdate(CategoryItem?._id, { type: "Categories", categories: cetegoriesItems });

        }

        res.status(200).json({
            success: true,
            message: "Layout Updated Successfully"
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//  get Layout by type

export const getLayoutByType = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { type } = req.body;

        const layout = await LayoutModel.findOne({ type });
        if (!layout) {
            return next(new ErrorHandler(`Layout not found with ${type}`, 404))
        }

        res.status(201).json({
            success: true,
            layout
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})
