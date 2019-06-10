import * as Knex from 'knex';
const tableName = 'user';

export class UserModel {
  getUser(db: Knex) {
    return db('user');
    //.select('*');
  }

  searchUser(db: Knex , columnName: string , searchValue : string) {
    return db('user')
    .where(columnName , "like" ,"%"+searchValue+"%");
  }

  updateUser(db: Knex, id: number, fname: string , lname:string) {
    return db(tableName)
      .update({ fname ,lname})
      .where("id", id);
  }

  getPatient(db: Knex) {
    return db('patient');
    //.select('*');
  }

  searchPatient(db: Knex , columnName: string , searchValue : string) {
    return db('patient')
    .where(columnName , "like" ,"%"+searchValue+"%");
  }

  insertVisit(db: Knex, data) {
    return db('opd_visit')
      .insert( data );
  }

  updateVisit(db: Knex, vn: any,data) {
    return db('opd_visit')
      .update( data )
      .where("vn",vn);
  }
}