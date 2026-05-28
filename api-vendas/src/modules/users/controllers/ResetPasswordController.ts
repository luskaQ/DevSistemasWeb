import { NextFunction, Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { token, pasword } = req.body;
            const resetPassword = new ResetPasswordService();
            await resetPassword.execute({ token, pasword });
            return res.status(204).json();
        } catch (err) {
            next(err);
            return res;
        }
    }
}