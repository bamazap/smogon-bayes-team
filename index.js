/* eslint-disable no-console */

const { getChaosData } = require('./lib/smogon');
const Team = require('./lib/Team');

function logErrorIfExists(err) {
  if (err) console.error(err);
}

async function main() {
  const data = await getChaosData('2018-07', 'gen7ou', 1825, logErrorIfExists);
  const team = new Team(data);
  for (let i = 0; i < 6; i += 1) {
    team.addMostLikelyTeammate();
  }
  console.log(team);
}

main();
