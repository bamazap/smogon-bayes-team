/* eslint-disable no-console */

const { ArgumentParser } = require('argparse');
const { getTimeframes, getChaos } = require('smogon-usage-fetch');
const Team = require('./lib/Team');

const parser = new ArgumentParser({
  version: '0.1.0',
  addHelp: true,
  description: 'Find the "most meta" Pokemon team using Smogon stats.',
});
parser.addArgument(
  ['-t', '--timeframe'],
  {
    help: 'Year and month (e.g. 2018-07, default: most recent)',
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

async function main() {
  if (!args.timeframe) {
    const timeframes = await getTimeframes();
    args.timeframe = timeframes[timeframes.length - 1];
  }
  const { data } = await getChaos(args.timeframe, `${args.metagame}-${args.baseline}`);
  const team = new Team(data);
  for (let i = 0; i < 6; i += 1) {
    team.addMostLikelyTeammate();
  }
  console.log(team.export());
}

main();
