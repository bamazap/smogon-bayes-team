const { getMovesets } = require('smogon-usage-fetch');
const { findBestMatch } = require('string-similarity');

function addSetSubparser(subparsers) {
  const setParser = subparsers.addParser('set', {
    addHelp: true,
    description: 'Get the most popular set options for a pokemon.',
  });
  setParser.addArgument(
    'pokemon',
    {
      help: 'Name of pokemon',
      require: true,
    },
  );
}

async function getSet(args) {
  const dataArr = await getMovesets(args.timeframe, `${args.metagame}-${args.baseline}`);
  const keys = [];
  const dataObj = {};
  dataArr.forEach((entry) => {
    keys.push(entry.pokemon);
    dataObj[entry.pokemon] = entry;
  });
  const key = findBestMatch(args.pokemon, keys).bestMatch.target;
  return dataObj[key];
}

module.exports = {
  addSetSubparser,
  getSet,
};
