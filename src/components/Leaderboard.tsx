import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/core.css' // idk why the css doesnt work
import Header from "./Header"

type LeaderboardProps = {
    title?: string
}

const Leaderboard = ({ title }: LeaderboardProps) => {
    return (
        <div className="container">
            <Header title="Leaderboard"/>

            <Menu menuButton = {<MenuButton>{title}</MenuButton>}>
                {/* <MenuItem
                    onClick = {(e) => {
                        // what you wanna do when clicked
                    }}>
                    
                    PGL Major Antwerp 2022
                </MenuItem>
                */}
                
                <SubMenu label = "PGL Major Antwerp 2022">
                    <MenuItem>Challenger Stage Day 1</MenuItem>
                    <MenuItem>Legends Stage Day 1</MenuItem>
                </SubMenu>

                <SubMenu label = "Generic Donnybrook A">
                    <MenuItem>Generic Stage 1</MenuItem>
                    <MenuItem>Generic Stage 2</MenuItem>
                </SubMenu>

                <SubMenu label = "Submenu Example">
                    <MenuItem>this is a submenu item</MenuItem>
                </SubMenu>

            </Menu>
        </div>
    )
}

Leaderboard.defaultProps = {
    title: "Leaderboard"
}

export default Leaderboard