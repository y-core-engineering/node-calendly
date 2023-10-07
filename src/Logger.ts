/*
 * Copyright (C) Y-Core Invest GmbH - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Dr. Sebastian Herden
 */
import dotenv from 'dotenv';
import winston from 'winston';
dotenv.config();

export const DEBUG_LEVEL: string = process.env.DEBUG_LEVEL
    ? process.env.DEBUG_LEVEL
    : 'debug';

export class LogHandler {
    private logger: winston.Logger;
    private static instance: LogHandler | undefined;

    private constructor() {
        const myWinstonOptions = {
            levels: winston.config.syslog.levels,
            transports: [new winston.transports.Console({ level: DEBUG_LEVEL })]
        };
        this.logger = winston.createLogger(myWinstonOptions);
    }

    public static newInstance(): LogHandler {
        if (!this.instance) this.instance = new LogHandler();
        return this.instance;
    }

    public debug(
        text: string | null | undefined,
        namespace: string | null | undefined,
        topic: string | null | undefined
    ) {
        this.logger.debug(this.buildLogMessage(text, namespace, topic));
    }

    public log(
        text: string | null | undefined,
        namespace: string | null | undefined,
        topic: string | null | undefined
    ) {
        this.logger.notice(this.buildLogMessage(text, namespace, topic));
    }

    public info(
        text: string | null | undefined,
        namespace: string | null | undefined,
        topic: string | null | undefined
    ) {
        this.logger.info(this.buildLogMessage(text, namespace, topic));
    }

    public error(
        text: string | null | undefined,
        namespace: string | null | undefined,
        topic: string | null | undefined
    ) {
        this.logger.error(this.buildLogMessage(text, namespace, topic));
    }

    private buildLogMessage(
        text: string | null | undefined,
        namespace?: string | null | undefined,
        topic?: string | null | undefined
    ): string {
        const now = new Date();
        return '[' + now + '@' + namespace + '->' + topic + '] ' + text;
    }
}
