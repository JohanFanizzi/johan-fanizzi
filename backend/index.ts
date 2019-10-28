import app from './app';
import startConnection from './database';

// Función de inicio
async function main() {
  // Iniciar conexción con la BD
  startConnection();

  // Obtener puerto
  await app.listen(app.get('port'));

  // Mensaje de Inicio
  console.log(`Server start on port ${ app.get('port') }`);
}

main();
