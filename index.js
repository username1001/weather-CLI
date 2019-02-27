const axios = require('axios');

const prompt = (message, callback) => {
  const stdin = process.stdin;
  const stdout = process.stdout;

  stdin.resume();
  stdout.write(message);

  stdin.once('data', data => {
    callback(data.toString().trim());
  });
};
