// TODO: add a submitted status indicator at the right side
// TODO: make teams show up on opposite ends of div rather than stacked vertically
import React, { useState } from 'react';
import Team from './Team';

const Match = () => {
    const [ pickedTeam, setPickedTeam ] = useState("none");
    const [ team1, setTeam1 ] = useState("Team 1");
    const [ team2, setTeam2 ] = useState("Team 2");
    // load team1 and team2 using setTeamX

    function handleTeam1() {
        setPickedTeam(team1);
        // set picked team in DayPredictions object
    }

    function handleTeam2() {
        setPickedTeam(team2);
    }

    return (
        // TODO: make selected team have an outline or some sort of visual indication of choice
        // can possibly just get rid of "current picked team"
        <div className="match">
            {`${team1} vs. ${team2}`}
            &nbsp;
            <div className="team-container">
                {/* if you put a space the css can recognize just the first slice, p cool */}
                <div className="team left">
                    <Team teamName={team1} onClick={handleTeam1} />
                </div>
                <div className="team right">
                    <Team teamName={team2} onClick={handleTeam2} />
                </div>
            </div>
            &nbsp;
            {`Currently picked team: ${pickedTeam}`}
        </div>
    );
}

export default Match;