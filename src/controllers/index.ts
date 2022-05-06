import { asyncHandler } from "../middlewares/asyncHandlerFn";

export const helloWorld = asyncHandler(async (req: any, res: any) => {
  
  res.status(200).json({
    success: true,
    message: "Hello world"
  })

});
