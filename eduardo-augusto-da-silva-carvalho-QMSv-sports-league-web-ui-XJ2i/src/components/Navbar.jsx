import React from 'react';
import styled from "styled-components"
import logo from "../assets/logo.svg"
import scheduleImg from "../assets/schedule.png"
import leaderboardImg from "../assets/leaderboard.png"
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Container>
        <nav>
            <div className="left">
                <div className="logo">
                    <img src={logo} alt="Website Logo" />
                </div>
            </div>
            <div className="right">
                <div>
                    <button onClick={() => navigate("/schedule")}>
                        <img src={scheduleImg} alt="Schedule Image button" />
                        Schedule
                    </button>
                </div>
                <div>
                    <button onClick={() => navigate("/leaderboard")}>
                        <img src={leaderboardImg} alt="Leaderboard Image button" />
                        Leaderboard
                    </button>
                </div>
            </div>
        </nav>
    </Container>
  );
}

const Container = styled.div`
width: 100%;
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;

        position: sticky;
        top: 0;
        width: 100vw;
        height: 3.75rem;        

        background-color: #025FEB;

        .left {
            padding-left: 2.5rem;
        }

        .right {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-right: 2.5rem;
            gap: 2.5rem;

            button {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 0.3rem;
                padding: 0.5rem;
                background-color: #025FEB;
                border: none;
                border-radius: 0.313rem;
                transition: all 0.3s ease-in-out;
                
                cursor: pointer;

                img {
                    height: 1.563rem;
                }

                font-family: 'Open Sans', sans-serif;
                font-size: 1rem;                
                color: #fff;

                &:hover {
                    background-color: #044bb4;
                }
            }
        }
    }
`;