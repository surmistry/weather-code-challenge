#!/usr/bin/env node
const weather = require('weather-js');

// Execute the following line to create a MacOS executable file from ./weather.js

// $ chmod +x ./weather.js

// Convert weather script into IIFE to retain propper context in the terminal shell
(async () => {


  const checkForPostCode = (check) => {
    const postExp = /^.*[0-9]/;
    return postExp.test(check)
  }

  const sanitizeInputs = (cities, separator = ',') => {
    const allCities = cities.join(' ');
    const separatedCities = allCities.split(separator);
    const specifiedCities = separatedCities.reduce((aggregateCities, currentCity, index) => {
      let newCities = aggregateCities;
      if (checkForPostCode(currentCity)) newCities[newCities.length - 1] = `${newCities[newCities.length - 1]} ${currentCity}`
      else newCities.push(currentCity)
      return newCities
    }, [])
    return specifiedCities;
  }

  const handleArguments = (process) => {
    const args = process.argv.slice(2);
    return args.length > 0 ? (sanitizeInputs(args)) : false;
  }


  const findWeather = (city, units = "C") => new Promise((resolve, reject) => {
    weather.find(
      { search: city, degreeType: units },
      (err, result) => {
        if (err) resolve({ err: true, message: 'Could not find the city: ' });
        (result && result[0]) ? resolve(result[0].current) : resolve(`City ${city} couldn't be found`);
      })
  });

  [inputCity] = handleArguments(process);
  const answers = await findWeather(inputCity);

})()
