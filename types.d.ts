declare namespace Express {
  export interface Request {
    userId: string;
    filter: {};
    select: {};
    populate: {
      filter: {},
      select: {}
    }
  }
}
