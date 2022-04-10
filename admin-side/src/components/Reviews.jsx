import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

export default function Reviews({ reviewQty, reviewInfo }) {
  return (
    <Box>
      <Divider>
        <Typography variant="h5">{reviewQty} Reviews</Typography>
      </Divider>
      <List sx={{ width: "100%" }}>
        {reviewInfo?.reviews?.map((review) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={review.username.toUpperCase()}
                sx={{ bgcolor: "#D19C97" }}
                src="img"
              />
            </ListItemAvatar>
            <ListItemText
              primary={review.username}
              secondary={
                <Stack direction={{ xs: "column", sm: "row" }}>
                  <Rating
                    name="read-only"
                    value={review.rating}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                  {` - ${review.comment}`}
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
