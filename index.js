var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: 'pulu' })
 
consoleWrite("docker-compose --version");
consoleWrite("docker --version");



http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 200
    console.log('webhook')
    res.end(req.url)
    
  })
}).listen(7777)
 
handler.on('error', function (err) {
  console.error('Error:', err.message)
  
})
 
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

handler.on('package', function (event) {
  console.log("branch: " + event.payload.package.package_version.target_commitish)

  //if(event.payload.package_version.target_commitish == 'dev'){
    console.log("install command: " + event.payload.package.package_version.installation_command)
    //consoleWrite(event.payload.package.package_version.installation_command);
    consoleWrite("docker-compose --version");
    consoleWrite("docker --version");
    consoleWrite("docker-compose pull");
    consoleWrite("docker-compose up -d");
  //}
  
  
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
