var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: 'pulu' })

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 200
    console.log('webhook')
    res.end(req.url)
    
  })
}).listen(7777)
 
handler.on('*', (event) => {
  console.log(`event: ${event.event}`)
})

handler.on('error', function (err) {
  console.error('Error:', err.message)
  
})
 
handler.on('registry_package', (event) => {
  const mode = event.host.split('.pulu.devbitapp.be')[0]
  const tag = event.payload.registry_package.package_version.container_metadata.tag.name


  console.log(`mode: ${mode}, tag: ${tag}`)

  if (mode == "production" && tag == 'latest') consoleWrite("make production-update production")
})

function consoleWrite(command){
  const { exec } = require("child_process");
  exec(command, {cwd: '/devops/deployment'}, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
