/* eslint-disable no-console */

const { ArgumentParser } = require('argparse');
const { getTimeframes } = require('smogon-usage-fetch');

const { addTeamSubparser, generateTeam } = require('./lib/team');
const { addSetSubparser, getSet } = require('./lib/set');

const baseParser = new ArgumentParser({
  version: '0.2.0',
  addHelp: true,
  description: 'Pokemon Showdown! Tools',
});
baseParser.addArgument(
  ['-t', '--timeframe'],
  {
    help: 'Year and month (e.g. 2018-07, default: most recent)',
  },
);
baseParser.addArgument(
  ['-m', '--metagame'],
  {
    help: 'Metagame (default: gen7ou)',
    defaultValue: 'gen7ou',
  },
);
baseParser.addArgument(
  ['-b', '--baseline'],
  {
    help: 'Skill baseline (default: 0)',
    defaultValue: 0,
  },
);

const subparsers = baseParser.addSubparsers({
  title: 'subcommands',
  dest: 'subcommand',
});

addTeamSubparser(subparsers);
addSetSubparser(subparsers);

const args = baseParser.parseArgs();

async function main() {
  if (!args.timeframe) {
    const timeframes = await getTimeframes();
    args.timeframe = timeframes[timeframes.length - 1];
  }
  let output = '';
  if (args.subcommand === 'team') output = (await generateTeam(args)).export();
  if (args.subcommand === 'set') output = await getSet(args);
  console.log(output);
}

main();
