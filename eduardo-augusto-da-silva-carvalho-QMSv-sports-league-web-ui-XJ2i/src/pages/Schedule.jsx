import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LeagueService from "../services/LeagueService";
import { format } from "date-fns";

export default function Schedule() {
  const [matches, setMatches] = useState([]);
  const leagueService = new LeagueService();

  useEffect(() => {
    const fetchData = async () => {
      await leagueService.fetchData();
      setMatches(leagueService.getMatches());
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Navbar />
      <div className="content">
        <h1>League Schedule</h1>
        <div className="table">
          <table width="100%">
            <thead>
              <tr>
                <th className="dateTimeHeader" width="10%">
                  Date/Time
                </th>
                <th className="separatorHeader" width="5%"></th>
                <th className="stadiumHeader" width="30%">
                  Stadium
                </th>
                <th className="homeTeamHeader" width="25%">
                  Home Team
                </th>
                <th width="5%"></th>
                <th className="awayTeamHeader" width="25%">
                  Away Team
                </th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => {
                const matchDate = new Date(match.matchDate);
                const formattedDate = format(matchDate, "d.M.yyyy");
                const formattedTime = format(matchDate, "HH:mm");
                let matchScore = "";
                if (match.matchPlayed) {
                  matchScore =
                    match.homeTeamScore + " - " + match.awayTeamScore;
                } else {
                  matchScore = "- : -";
                }

                return (
                  <tr key={index}>
                    <td>
                      <div className="dateTimeCell">
                        <span>{formattedDate}</span>
                        <span>{formattedTime}</span>
                      </div>
                    </td>
                    <td></td>
                    <td>
                      <div className="stadiumCell">{match.stadium}</div>
                    </td>
                    <td>
                      <div className="homeTeamCell">
                        <span>{match.homeTeam}</span>
                        <img
                          src={`https://flagsapi.codeaid.io/${encodeURIComponent(
                            match.homeTeam
                          )}.png`}
                          alt={match.homeTeam}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="matchResultCell">
                        <span>{matchScore}</span>
                      </div>
                    </td>
                    <td>
                      <div className="awayTeamCell">
                        <img
                          src={`https://flagsapi.codeaid.io/${encodeURIComponent(
                            match.awayTeam
                          )}.png`}
                          alt={match.awayTeam}
                        />
                        <span>{match.awayTeam}</span>
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
      //border: 1px solid red;
      width: 90%;

      table {
        color: #4b5c68;
        border-collapse: collapse;

        thead {
          height: 2.5rem;

          font-size: 0.75rem;
          font-weight: bold;
          background-color: #e4edf2;

          .dateTimeHeader {
            @media screen and (max-width: 500px) {
              display: none;
            }
          }
          .dateTimeHeader,
          .homeTeamHeader {
            text-align: right;
          }

          .separatorHeader,
          .stadiumHeader {
            @media screen and (max-width: 750px) {
              display: none;
            }
          }

          .stadiumHeader,
          .awayTeamHeader {
            text-align: left;
          }
        }
        tbody {
          td {
            height: 4.375rem;
            font-size: 0.875rem;

            &:nth-child(1) {
              @media screen and (max-width: 500px) {
                display: none;
              }
            }
            &:nth-child(2),
            &:nth-child(3) {
              @media screen and (max-width: 750px) {
                display: none;
              }
            }
          }

          tr {
            &:nth-child(even) {
              background-color: #f6f7f7;
            }
            border-top: 1px solid #e4edf2;
          }

          img {
            height: 2.313rem;
            width: 3.313rem;
          }

          .dateTimeCell {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 0.3rem;
            flex-direction: column;

            @media screen and (max-width: 500px) {
              display: none;
            }
          }
          .stadiumCell {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            @media screen and (max-width: 750px) {
              display: none;
            }
          }
          .matchResultCell {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            font-weight: bold;
            min-width: 50px;
          }
          .homeTeamCell {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 0.8rem;
            font-size: 1rem;
            font-weight: bold;
          }
          .awayTeamCell {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.8rem;
            font-size: 1rem;
            font-weight: bold;
          }
        }
      }
    }
  }
`;
