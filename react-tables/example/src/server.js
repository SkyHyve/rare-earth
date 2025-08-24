import path from 'path';

const fastify = require('fastify');
const fastifyStatic = require('@fastify/static');

// FASTIFY CONFIG
const app = fastify({ logger: true })
app.register(fastifyStatic, {
    root: path.join(__dirname, '../public')
})

// Serve the CSS file from node_modules
app.get('/react-tables.css', async function(req, res) {
    const fs = require('fs').promises;
    const cssPath = path.join(__dirname, '../node_modules/@rare-earth/react-tables/dist/css/react-tables.css');
    try {
        const cssContent = await fs.readFile(cssPath, 'utf8');
        res.header('Content-Type', 'text/css');
        return cssContent;
    } catch (error) {
        res.code(404);
        return 'CSS file not found';
    }
})
app.get('/', async function response(req, res){
  // Fixed nonce for testing
  const nonce = 'test-nonce-123';
  
  // Read CSS file
  const fs = require('fs').promises;
  const cssPath = path.join(__dirname, '../node_modules/@rare-earth/react-tables/dist/css/react-tables.css');
  let cssContent = '';
  try {
    cssContent = await fs.readFile(cssPath, 'utf8');
  } catch (error) {
    console.error('Failed to read CSS file:', error);
  }
  
  res.header('Content-Type', 'text/html');
  // Strict CSP - only allow scripts and styles with the nonce
  res.header('Content-Security-Policy', `default-src 'self'; script-src 'nonce-${nonce}'; style-src 'self' 'nonce-${nonce}'; img-src 'self' data:; font-src 'self'; connect-src 'self';`);
  
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
  <link href="/react-tables.css" rel="stylesheet" />

</head>
<body>
  <main>
    <div id="root">

    </div>
  </main>
  <script nonce="${nonce}" defer type="text/javascript" src="/client.js"></script>
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
