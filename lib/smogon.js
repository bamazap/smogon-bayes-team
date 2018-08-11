const fs = require('fs');
const path = require('path');
const rpn = require('request-promise-native');


const utf8 = { encoding: 'utf8' };

const doNothing = () => {};

function getChaosData(timeframe, metagame, minElo, onWriteError = doNothing) {
  const fileName = `${timeframe}-${metagame}-${minElo}.json`;
  const filePath = path.resolve(__dirname, '..', 'data', fileName);
  try {
    const { data } = JSON.parse(fs.readFileSync(filePath, utf8));
    return Promise.resolve(data);
  } catch (e) {
    return rpn
      .get(`https://www.smogon.com/stats/${timeframe}/chaos/${metagame}-${minElo}.json`)
      .then((res) => {
        const obj = JSON.parse(res);
        fs.writeFile(filePath, JSON.stringify(obj, null, 2), utf8, onWriteError);
        return obj.data;
      });
  }
}

module.exports = {
  getChaosData,
};
