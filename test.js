const fs = require('fs');
const path = require('path');
const Keyboard = require('./index');
const keyboard = new Keyboard();

const logFilePath = path.join(__dirname, 'keylog.txt');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

keyboard.on('keydown', event => {
  const logEntry = `Key down: ${event.keyId}\n`;
  console.log(logEntry.trim());
  logStream.write(logEntry);
});

keyboard.on('error', err => {
  const errorEntry = `Error: ${err}\n`;
  console.error(errorEntry.trim());
  logStream.write(errorEntry);
});

process.on('exit', () => {
  logStream.end();
});

process.on('SIGINT', () => {
  process.exit();
});
