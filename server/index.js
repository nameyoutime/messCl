
const Database = require('./src/database')
const config = require('./src/config');
const app = require('./src/server')


async function main() {
  await Database.instance.connect();
  app.listen(config.PORT, config.HOST, () => {
    console.log(`Server started on ${config.HOST}:${config.PORT}`);
  })
}

main()