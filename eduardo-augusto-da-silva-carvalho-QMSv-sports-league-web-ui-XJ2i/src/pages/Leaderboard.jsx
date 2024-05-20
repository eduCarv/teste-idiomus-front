import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeagueService from "../services/LeagueService";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const leagueService = new LeagueService();

  useEffect(() => {
    const fetchData = async () => {
      await leagueService.fetchData();
      setLeaderboard(leagueService.getLeaderboard());
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Navbar />
      <div className="content">
        <h1>League Standings</h1>
        <div className="table">
          <table width="100%">
            <thead>
              <tr>
                <th className="teamNameHeader" width="50%">
                  Team Name
                </th>
                <th className="matchesPlayedHeader" width="10%">
                  MP
                </th>
                <th className="goalDiferenceHeader" width="10%">
                  GD
                </th>
                <th className="goalsForHeader" width="10%">
                  GF
                </th>
                <th className="goalsAgainstHeader" width="10%">
                  GA
                </th>
                <th className="teamPointsHeader" width="10%">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((team, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="teamNameCell">
                        <img
                          src={`https://flagsapi.codeaid.io/${encodeURIComponent(
                            team.teamName
                          )}.png`}
                          alt={team.teamName}
                        />
                        <span>{team.teamName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="matchesPlayedCell">
                        <span>{team.matchesPlayed}</span>
                      </div>
                    </td>
                    <td>
                      <div className="goalDiferenceCell">
                        <span>{team.goalsFor - team.goalsAgainst}</span>
                      </div>
                    </td>
                    <td>
                      <div className="goalsForCell">
                        <span>{team.goalsFor}</span>
                      </div>
                    </td>
                    <td>
                      <div className="goalsAgainstCell">
                        <span>{team.goalsAgainst}</span>
                      </div>
                    </td>
                    <td>
                      <div className="teamPointsCell">
                        <span>{team.points}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  font-family: "Open Sans", sans-serif;
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 3.75rem;

    h1 {
      margin: 0;
      font-size: 1.5rem;
      margin-bottom: 1.25rem;
    }

    .table {
      width: 90%;

      table {
        color: #4b5c68;
        border-collapse: collapse;

        thead {
          height: 2.5rem;

          font-size: 0.75rem;
          font-weight: bold;
          background-color: #e4edf2;

          .teamNameHeader {
            text-align: left;
            padding-left: 0.938rem;
          }

          .goalDiferenceHeader {
            @media screen and (min-width: 500px) {
              display: none;
            }
          }

          .goalsForHeader,
          .goalsAgainstHeader {
            @media screen and (max-width: 500px) {
              display: none;
            }
          }
        }
        tbody {
          tr {
            border-top: 1px solid #e4edf2;
          }
          img {
            height: 2.313rem;
            width: 3.313rem;
          }

          td {
            height: 4.375rem;
            font-size: 0.875rem;

            &:not(:first-child) {
              text-align: center;
            }

            //.goalDiferenceCell
            &:nth-child(3) {
              @media screen and (min-width: 500px) {
                display: none;
              }
            }
            &:nth-child(4),
            &:nth-child(5) {
              @media screen and (max-width: 500px) {
                display: none;
              }
            }

            .teamNameCell {
              display: flex;
              align-items: center;
              gap: 0.8rem;

              padding-left: 0.938rem;

              font-size: 1rem;
              font-weight: bold;
            }

            .teamPointsCell {
              font-weight: bold;
              color: #025feb;
            }
          }
        }
      }
    }
  }
`;
