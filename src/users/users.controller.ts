import { NextFunction, Request, Response } from "express";
import {inject, injectable} from "inversify";
import { BaseController } from "../common/base.controller";
import {HTTPError} from "../errors/http-error.class";
import {ILogger} from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata'
import {IUserController} from "./users.controller.interface";


@injectable()
export class UserController extends BaseController implements IUserController {
    constructor(
        @inject(TYPES.ILogger) private LoggerService: ILogger
    ) {
        super(LoggerService);
        this.bindRoutes([
            { path: '/register', method: 'post', func: this.register },
            { path: '/login', method: 'post', func: this.login },
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'ошибка авторизации', 'login'));
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login');
    }
}