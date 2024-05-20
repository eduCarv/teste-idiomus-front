/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
class LeagueService {
  constructor() {
    this.matches = [];
  }
  /**
   * Sets the match schedule.
   * Match schedule will be given in the following form:
   * [
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      },
   *      {
   *          matchDate: [TIMESTAMP],
   *          stadium: [STRING],
   *          homeTeam: [STRING],
   *          awayTeam: [STRING],
   *          matchPlayed: [BOOLEAN],
   *          homeTeamScore: [INTEGER],
   *          awayTeamScore: [INTEGER]
   *      }
   * ]
   *
   * @param {Array} matches List of matches.
   */
  setMatches(matches) {
    this.matches = matches;
  }

  /**
   * Returns the full list of matches.
   *
   * @returns {Array} List of matches.
   */
  getMatches() {
    return this.matches;
  }

  /**
   * Returns the leaderboard in a form of a list of JSON objecs.
   *
   * [
   *      {
   *          teamName: [STRING]',
   *          matchesPlayed: [INTEGER],
   *          goalsFor: [INTEGER],
   *          goalsAgainst: [INTEGER],
   *          points: [INTEGER]
   *      },
   * ]
   *
   * @returns {Array} List of teams representing the leaderboard.
   */
  getLeaderboard() {
    const teams = {};

    // Calculate initial stats for each team
    this.matches.forEach((match) => {
      if (!teams[match.homeTeam]) {
        teams[match.homeTeam] = {
          teamName: match.homeTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        };
      }
      if (!teams[match.awayTeam]) {
        teams[match.awayTeam] = {
          teamName: match.awayTeam,
          matchesPlayed: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        };
      }

      if (match.matchPlayed) {
        teams[match.homeTeam].matchesPlayed++;
        teams[match.awayTeam].matchesPlayed++;
        teams[match.homeTeam].goalsFor += match.homeTeamScore;
        teams[match.homeTeam].goalsAgainst += match.awayTeamScore;
        teams[match.awayTeam].goalsFor += match.awayTeamScore;
        teams[match.awayTeam].goalsAgainst += match.homeTeamScore;

        if (match.homeTeamScore > match.awayTeamScore) {
          teams[match.homeTeam].points += 3;
        } else if (match.homeTeamScore < match.awayTeamScore) {
          teams[match.awayTeam].points += 3;
        } else {
          teams[match.homeTeam].points += 1;
          teams[match.awayTeam].points += 1;
        }
      }
    });

    // Convert teams object to array
    let leaderboard = Object.values(teams);

    // Apply tie-breakers
    leaderboard.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points; // Sort by points
      }

      // Head-to-head points
      const headToHeadPoints = this.calculateHeadToHeadPoints(
        a.teamName,
        b.teamName
      );
      if (headToHeadPoints[b.teamName] !== headToHeadPoints[a.teamName]) {
        return headToHeadPoints[b.teamName] - headToHeadPoints[a.teamName];
      }

      // Goal difference
      const goalDifferenceA = a.goalsFor - a.goalsAgainst;
      const goalDifferenceB = b.goalsFor - b.goalsAgainst;
      if (goalDifferenceB !== goalDifferenceA) {
        return goalDifferenceB - goalDifferenceA;
      }

      // Goals scored
      if (b.goalsFor !== a.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }

      // Alphabetical order
      return a.teamName.localeCompare(b.teamName);
    });

    return leaderboard;
  }

  /**
   * Calculate head-to-head points for two teams.
   * @param {string} teamA The name of the first team.
   * @param {string} teamB The name of the second team.
   * @returns {Object} An object with the head-to-head points for both teams.
   */
  calculateHeadToHeadPoints(teamA, teamB) {
    const points = {
      [teamA]: 0,
      [teamB]: 0,
    };

    this.matches.forEach((match) => {
      if (
        (match.homeTeam === teamA && match.awayTeam === teamB) ||
        (match.homeTeam === teamB && match.awayTeam === teamA)
      ) {
        if (match.matchPlayed) {
          if (
            match.homeTeam === teamA &&
            match.homeTeamScore > match.awayTeamScore
          ) {
            points[teamA] += 3;
          } else if (
            match.homeTeam === teamA &&
            match.homeTeamScore < match.awayTeamScore
          ) {
            points[teamB] += 3;
          } else if (
            match.awayTeam === teamA &&
            match.awayTeamScore > match.homeTeamScore
          ) {
            points[teamA] += 3;
          } else if (
            match.awayTeam === teamA &&
            match.awayTeamScore < match.homeTeamScore
          ) {
            points[teamB] += 3;
          } else {
            points[teamA] += 1;
            points[teamB] += 1;
          }
        }
      }
    });

    return points;
  }

  /**
   * Asynchronic function to fetch the data from the server and set the matches.
   */

  async fetchData() {
    try {
      const tokenResponse = await fetch(
        "http://localhost:3001/api/v1/getAccessToken",
        {
          method: "GET",
        }
      );
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const matchesResponse = await fetch(
        "http://localhost:3001/api/v1/getAllMatches",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (matchesResponse.status === 401) {
        throw new Error("Unauthorized Access");
      }

      const matchesData = await matchesResponse.json();

      this.setMatches(matchesData.matches);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

export default LeagueService;
