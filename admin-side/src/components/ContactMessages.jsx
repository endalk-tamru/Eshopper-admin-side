import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function ContactMessages({ msg }) {
  const { username, email, subject, message, isSeen, createdAt } = msg;

  return (
    <Card sx={{ width: "100%", mb: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "#D19C97" }} alt={username} src="" />}
        title={`${username} - ${email}`}
        subheader={new Date(createdAt).toLocaleString("en-US")}
      />
      <CardContent>
        <Typography
          variant={!isSeen ? "h5" : "subtitle1"}          
          color="text.primary"          
        >
          {subject}
        </Typography>
        <Typography
          variant={!isSeen ? "body1" : "body2"}          
          color="text.secondary"          
        >
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
}
