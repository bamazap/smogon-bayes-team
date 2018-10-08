const { getChaos } = require('smogon-usage-fetch');
const { Team } = require('./Team');

function addTeamSubparser(subparsers) {
  subparsers.addParser('team', {
    addHelp: true,
    description: 'Find the "most meta" Pokemon team using Smogon stats.',
  });
}

async function generateTeam(args) {
  const { data } = await getChaos(args.timeframe, `${args.metagame}-${args.baseline}`);
  const team = new Team(data);
  for (let i = 0; i < 6; i += 1) {
    team.addMostLikelyTeammate();
  }
  return team;
}

module.exports = {
  addTeamSubparser,
  generateTeam,
};
