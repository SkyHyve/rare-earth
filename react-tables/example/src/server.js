import path from 'path';

const fastify = require('fastify');
const fastifyStatic = require('@fastify/static');

// FASTIFY CONFIG
const app = fastify({ logger: true })
app.register(fastifyStatic, {
    root: path.join(__dirname, '../public')
})
app.get('/', async function response(req, res){
  res.header('Content-Type', 'text/html');
  return(
`
<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8"/>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link href="https://skyhyve.com.au" rel="canonical" />
  <link href="https://skyhyve.com.au" rel="home" />

  <title>RareEarth</title>

</head>
<body>
  <main>
    <div id="root">

    </div>
  </main>
  <script defer type="text/javascript" src="/client.js"></script>
</body>
</html>
`
  );
});


// START SERVER
const start = async function(){
    try {
        await app.listen({host: '0.0.0.0', port: 8080});
    } catch (e) {
        app.log.error(e);
        process.exit(1);
    }
}
start();
