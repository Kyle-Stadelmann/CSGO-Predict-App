import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/core.css' // idk why the css doesnt work
import Header from "./Header"

type VotingProps = {
    title?: string
}

const Leaderboard = ({ title }: VotingProps) => {
    return (
        <div className="container">
            <Header title="Voting"/>

            <Menu menuButton = {<MenuButton>{title}</MenuButton>}>
                <MenuItem
                    onClick = {(e) => {
                        // what you wanna do when clicked
                    }}>
                    
                    Challenger Stage Day 1
                </MenuItem>

                <MenuItem>Legends Stage Day 1</MenuItem>

                <SubMenu label = "Submenu Example">
                    <MenuItem>idk what we would use a submenu for here</MenuItem>
                </SubMenu>

            </Menu>
        </div>
    )
}

Leaderboard.defaultProps = {
    title: "Voting"
}

export default Leaderboard