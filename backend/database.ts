import { connect, ConnectionOptions } from 'mongoose';

export default async function startConnection() {
  let url: string = process.env.MONGODB_URI as string;
  let options: ConnectionOptions = {
    auth: {
      user: process.env.MONGODB_USER as string,
      password: process.env.MONGODB_PASS as string
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  try {
    await connect(url, options);
    console.info('Database is connected.');
  } catch (err) {
    console.error(`Error connectiong to the database. Error message => ${ err.message }`);
  }
}
