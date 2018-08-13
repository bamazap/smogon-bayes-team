const PriorityQueue = require('./PriorityQueue');

function maxKey(obj) {
  let bestKey;
  let bestValue = Number.NEGATIVE_INFINITY;
  Object.entries(obj).forEach(([key, val]) => {
    if (val > bestValue) {
      bestKey = key;
      bestValue = val;
    }
  });
  return bestKey;
}

function sortedKeys(obj) {
  // eslint-disable-next-line no-unused-vars
  return Object
    .entries(obj)
    .sort(([moveA, freqA], [moveB, freqB]) => freqB - freqA) // eslint-disable-line no-unused-vars
    .map(([move, freq]) => move); // eslint-disable-line no-unused-vars
}

class Team {
  constructor(data) {
    this.data = data;
    this.team = [];
    this.pq = new PriorityQueue();
    this.correlations = {};
    Object.entries(data).forEach(([pokemonName, { usage, Teammates }]) => {
      this.pq.add(pokemonName, 1 - usage);
      this.correlations[pokemonName] = {};
      Object.entries(Teammates).forEach(([partnerName, percent]) => {
        this.correlations[pokemonName][partnerName] = percent;
      });
    });
  }

  addMostLikelyTeammate() {
    const newTeammate = this.pq.poll();
    this.pq.remove(newTeammate);
    this.team.push(newTeammate);
    this.updatePQ(newTeammate);
  }

  updatePQ(newTeammate) {
    Object.entries(this.pq.priorities).forEach(([pokemonName, oldNotUsedRate]) => {
      const percentChange = this.correlations[newTeammate][pokemonName];
      const newNotUsedRate = oldNotUsedRate - percentChange / 100;
      this.pq.changePriority(pokemonName, newNotUsedRate);
    });
  }

  export() {
    let text = '';
    this.team.forEach((pokemonName) => {
      const item = maxKey(this.data[pokemonName].Items);
      const ability = maxKey(this.data[pokemonName].Abilities);
      const spread = maxKey(this.data[pokemonName].Spreads);
      const [nature, evs] = spread.split(':');
      const [
        HP,
        Atk,
        Def,
        SpA,
        SpD,
        Spe,
      ] = evs.split('/');
      const [move1, move2, move3, move4] = sortedKeys(this.data[pokemonName].Moves);
      text += `
${pokemonName} @ ${item}
Ability: ${ability}
EVs: ${HP} HP / ${Atk} Atk / ${Def} Def / ${SpA} SpA / ${SpD} SpD / ${Spe} Spe
${nature} Nature
- ${move1}
- ${move2}
- ${move3}
- ${move4}

`;
    });
    return text;
  }
}

module.exports = Team;
