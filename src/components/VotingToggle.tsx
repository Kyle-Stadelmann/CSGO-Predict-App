import React from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextBox from "./TextBox"

type ToggleButtonProps = {
    teams: Array<string>  // requires options
}

const VotingToggle = ({ teams }: ToggleButtonProps) => {
    const [alignment, setAlignment] = React.useState<string | null>('left');

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <div>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                >
                
                {/* idk how to make an onClick for these */}
                <ToggleButton value="left">
                    <TextBox text={teams[0]} />
                </ToggleButton>

                <ToggleButton value="right">
                    <TextBox text={teams[1]} />
                </ToggleButton>

            </ToggleButtonGroup>
        </div>
    )
}

export default VotingToggle