import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Typography from "@mui/material/Typography";

import { fetchUsers } from "../features/users/userSlice";

export default function NewUsers() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ newUsersQuery: true }));
  }, [dispatch]);

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: 360,
        minHeight: "100%",
        boxShadow: 2,
        borderRadius: 0.7,
        padding: 1.5,
      }}
    >
      <Typography variant="h5" component="div" gutterBottom>
        New joined users
        <Typography variant="body2" component="span" color="text.secondary">
          {" "}
          - last 48 hours
        </Typography>
      </Typography>

      <List>
        {users?.slice(0, 3).map((user) => (
          <Box key={user._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={user.username.toUpperCase()}
                  src="img"
                  sx={{ bgcolor: "#D19C97" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {user.email}
                    </Typography>
                    {` — ${new Date(user.createdAt).toLocaleDateString()}`}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Box>
        ))}
      </List>

      <AvatarGroup max={5} sx={{ my: 1, justifyContent: "center" }}>
        {users?.slice(3).map((user) => (
          <Avatar
            key={user._id}
            alt={user.username.toUpperCase()}
            src="img"
            sx={{ bgcolor: "#D19C97" }}
          />
        ))}
      </AvatarGroup>
    </Box>
  );
}
