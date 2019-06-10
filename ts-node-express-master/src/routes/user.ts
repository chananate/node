/// <reference path="../../typings.d.ts" />

import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { UserModel } from '../models/user';

const userModel = new UserModel();

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.send({ ok: true, code: HttpStatus.OK });
});

router.post('/get-user', async (req: Request, res: Response) => {
  let db = req.db;
  userModel.getUser(db)
    .then(result => {
      res.send({ ok: true, statusCode: HttpStatus.OK, rows: result });
    })
    .catch(err => {
      res.send({ ok: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, error: err });
    })

});

router.post('/search-user', async (req: Request, res: Response) => {
  let db = req.db;
  const columnName = req.body.columnName;
  const searchValue = req.body.searchValue;

  userModel.searchUser(db, columnName, searchValue)
    .then(result => {
      res.send({ ok: true, statusCode: HttpStatus.OK, rows: result });
    })
    .catch(err => {
      res.send({ ok: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, error: err });
    })

});

router.post('/update-user', async (req: Request, res: Response) => {
  let db = req.db;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const id = req.body.id;

  try {
      const result = await userModel.updateUser(db, id, fname, lname);
      res.send({ statusCode: HttpStatus.OK, rows: result });
  } catch (error) {
      console.log('update-user ', error.message);
      res.send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message });
  }

});

router.post('/get-patient', async (req: Request, res: Response) => {
  let db = req.db;
  userModel.getPatient(db)
    .then(result => {
      res.send({ ok: true, statusCode: HttpStatus.OK, rows: result });
    })
    .catch(err => {
      res.send({ ok: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, error: err });
    })

});

router.post('/search-patient', async (req: Request, res: Response) => {
  let db = req.db;
  const columnName = req.body.columnName;
  const searchValue = req.body.searchValue;

  userModel.searchPatient(db, columnName, searchValue)
    .then(result => {
      res.send({ ok: true, statusCode: HttpStatus.OK, rows: result });
    })
    .catch(err => {
      res.send({ ok: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, error: err });
    })

});

router.post('/insert-visit', async (req: Request, res: Response) => {
  let db = req.db;
  const data = req.body.data;

  try {
      const result = await userModel.insertVisit(db, data);
      res.send({ ok: true, statusCode: HttpStatus.OK, vn: result[0] });
  } catch (error) {
      console.log('insert-visit', error.message);
      res.send({ ok: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message });
  }

});

export default router;