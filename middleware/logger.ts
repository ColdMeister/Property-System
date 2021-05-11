import express, {Application, Request, Response, NextFunction} from 'express';
import moment from 'moment';

const logger = (req: Request, res: Response, next: NextFunction) => {
    //console.log('Hello');
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
    next();
}

module.exports = logger;