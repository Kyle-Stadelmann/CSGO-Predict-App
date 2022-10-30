// TODO: add a submitted status indicator at the right side
// TODO: make teams show up on opposite ends of div rather than stacked vertically
import { Match as ApiMatch, Team as ApiTeam } from 'csgo-predict-api';
import { useState } from 'react';
import Team from './Team';

type MatchProps = {
    match: ApiMatch;
}

const Match = ({ match }: MatchProps) => {
    const team1 = match.team1;
    const team2 = match.team2;

    const [ pickedTeam, setPickedTeam ] = useState({} as ApiTeam);
    // load team1 and team2 using setTeamX

    function handleTeam1() {
        setPickedTeam(match.team1);
        // set picked team in DayPredictions object
    }

    function handleTeam2() {
        setPickedTeam(match.team2);
    }

    return (
        // TODO: make selected team have an outline or some sort of visual indication of choice
        // can possibly just get rid of "current picked team"
        <div className="match">
            {`${team1.name} vs. ${team2.name}`}
            &nbsp;
            <div className="team-container">
                {/* if you put a space the css can recognize just the first slice, p cool */}
                <div className="team left">
                    <Team id={team1.id} name={team1.name} logoUrl={team1.logo_url} country={team1.country} rank={team1.rank} onClick={handleTeam1} />
                </div>
                <div className="team right">
                    <Team id={team2.id} name={team2.name} logoUrl={team2.logo_url} country={team2.country} rank={team2.rank} onClick={handleTeam2} />
                </div>
            </div>
            &nbsp;
            {`Currently picked team: ${pickedTeam.name ?? "N/A"}`}
        </div>
    );
}

export default Match;