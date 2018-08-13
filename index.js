/* eslint-disable no-console */

const { ArgumentParser } = require('argparse');
const { getChaosData } = require('./lib/smogon');
const Team = require('./lib/Team');

const now = new Date();
const defaultYear = `${now.getFullYear()}`;
const monthValue = now.getMonth(); // deliberately last month
const defaultMonth = monthValue < 10 ? `0${monthValue}` : `${monthValue}`;

const parser = new ArgumentParser({
  version: '0.1.0',
  addHelp: true,
  description: 'Find the "most meta" Pokemon team using Smogon stats.',
});
parser.addArgument(
  ['-t', '--timeframe'],
  {
    help: 'Year and month (e.g. 2018-07, default: most recent)',
    defaultValue: `${defaultYear}-${defaultMonth}`,
  },
);
parser.addArgument(
  ['-m', '--metagame'],
  {
    help: 'Metagame (default: gen7ou)',
    defaultValue: 'gen7ou',
  },
);
parser.addArgument(
  ['-b', '--baseline'],
  {
    help: 'Skill baseline (default: 0)',
    defaultValue: 0,
  },
);
const args = parser.parseArgs();


function logErrorIfExists(err) {
  if (err) console.error(err);
}

async function main() {
  const data = await getChaosData(args.timeframe, args.metagame, args.baseline, logErrorIfExists);
  const team = new Team(data);
  for (let i = 0; i < 6; i += 1) {
    team.addMostLikelyTeammate();
  }
  console.log(team.export());
}

main();
