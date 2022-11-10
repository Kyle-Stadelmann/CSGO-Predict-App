// this will be the main content of the Management page
// it will contain the leaderboard (left side, user scores in that tournament)
// and the voting window (right side, voting (it exists already))
import React from 'react'
import Leaderboard from './Leaderboard'
import Voting from './Voting'

const Tournament = () => {
  return (
    <div className="tournament">
        <Leaderboard />
        <Voting />
    </div>
  )
}

export default Tournament