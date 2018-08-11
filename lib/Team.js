const PriorityQueue = require('./PriorityQueue');


class Team {
  constructor(data) {
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
}

module.exports = Team;
