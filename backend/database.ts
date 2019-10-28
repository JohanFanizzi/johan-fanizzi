import { connect, ConnectionOptions } from 'mongoose';

export default async function startConnection() {
  // Configuración de la BD
  const url: string = process.env.MONGODB_URI as string;
  const options: ConnectionOptions = {
    auth: {
      user: process.env.MONGODB_USER as string,
      password: process.env.MONGODB_PASS as string
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

  try {
    // Iniciar conexción
    await connect(url, options);

    // Mensaje de conexción correcta
    console.info('Database is connected.');
  } catch (err) {
    console.error(`Error connectiong to the database. Error message => ${ err.message }`);
  }
}
