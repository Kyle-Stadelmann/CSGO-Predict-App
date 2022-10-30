// TODO: add a submitted status indicator at the right side
import { Match as ApiMatch, Team as ApiTeam } from 'csgo-predict-api';
import { useState } from 'react';
import { Picks } from './Pages/Voting';
import Team from './Team';

type MatchProps = {
    match: ApiMatch;
    picks: Picks;
    setPicks: Function;
}

const Match = ({ match, picks, setPicks }: MatchProps) => {
    const team1 = match.team1;
    const team2 = match.team2;
    // theres probably a way to get pickedTeam with picks[match.id] i cant think of how
    const [ pickedTeam, setPickedTeam ] = useState({} as ApiTeam);

    function handleTeam1() {
        picks[match.id] = team1.id;
        setPickedTeam(team1);
        setPicks({ ...picks });
    }

    function handleTeam2() {
        picks[match.id] = team2.id;
        setPickedTeam(team2);
        setPicks({ ...picks });
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
            {/* i want the team name that matches picks[match.id] */}
            {`Currently picked team: ${pickedTeam.name ?? "N/A"}`}
        </div>
    );
}

export default Match;