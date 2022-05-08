import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/core.css' // idk why the css doesnt work
import Header from "./Header"
import TextBox from "./TextBox"
import VotingToggle from "./VotingToggle"

type VotingProps = {
    title?: string
}

const Voting = ({ title }: VotingProps) => {
    return (
        <div className="container">
            <Header title="Voting"/>

            <Menu menuButton = {<MenuButton>{title}</MenuButton>}>
                <MenuItem
                    onClick = {(e) => {
                        // idk how to make this work
                    }}>
                    
                    Challenger Stage Day 1
                </MenuItem>

                <MenuItem>Legends Stage Day 1</MenuItem>

            </Menu>
            
            {/* doesn't currently support capitalization */}
            {/* hopefully you should be able to grab the team names data and pass it here */}
            <VotingToggle teams={["NaVi", "FaZe"]} />

            {/* TODO: display selected team somehow */}
            <TextBox text="Team selected: " />
        </div>
    )
}

Voting.defaultProps = {
    title: "Voting"
}

export default Voting