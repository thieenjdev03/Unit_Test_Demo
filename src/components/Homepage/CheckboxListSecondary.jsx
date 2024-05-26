import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

export default function CheckboxListSecondary({ userList, onCheckedUsersChange }) {
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        onCheckedUsersChange(newChecked);
    };

    return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {userList.map((user) => {
                const labelId = `checkbox-list-secondary-label-${user.id}`;
                return (
                    <ListItem
                        key={user.id}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(user.id)}
                                checked={checked.indexOf(user.id) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${user.id}`}
                                    src={`/static/images/avatar/${user.id}.jpg`}
                                />
                            </ListItemAvatar>
                            <div className="textSection">
                                <ListItemText id={labelId} primary={`User name: ${user.name}`} />
                                <div className="phoneNumberText">Phone Number: {user.phone}</div>
                            </div>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
