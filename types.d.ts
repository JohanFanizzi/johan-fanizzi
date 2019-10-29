declare namespace Express {
  export interface Request {
    UserId: string;
    filter: {};
    select: {};
    populate: {
      filter: {},
      select: {}
    }
  }
}
