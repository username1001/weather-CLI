const axios = require('axios');

const apiKey = 'b70868fc7f9c4e39edd8956e520ef4b5';

const prompt = (message, callback) => {
  const stdin = process.stdin;
  const stdout = process.stdout;

  stdin.resume();
  stdout.write(message);

  stdin.once('data', data => {
    callback(data.toString().trim());
  });
};

prompt('Enter a location or a postal code: ', function(location) {
  if (!location) {
    console.log('Please try again');
    process.exit();
  }

  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`
    )
    .then(res => {
      let weather = res;
      let message = `\nCurrent date and time: ${weather.headers.date}\nIt's ${
        weather.data.main.temp
      } degrees in ${location}.`;
      console.log(message);
      process.exit();
    })
    .catch(err => console.log(err));
});
