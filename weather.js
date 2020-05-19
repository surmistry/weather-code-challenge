#!/usr/bin/env node

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

})()
