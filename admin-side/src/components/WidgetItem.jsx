import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function DataWidgetCard(props) {
  const { bgColor, title, data, profit, tooltip } = props;

  return (
    <Card
      variant="outlined"
      sx={{ width: 270, height: 170, borderColor: bgColor }}
    >
      <CardContent sx={{ textAlign: "center", py: 2 }}>
        <Typography
          variant="subtitle1"
          component="div"
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography variant="h3" component="div" gutterBottom>
          {data}
        </Typography>

        <Typography
          variant="body1"
          component="p"
          color="text.secondary"
          sx={{ alignItems: "center" }}
        >
          {profit >= 0 && (
            <Tooltip title={tooltip} arrow>
              <Button>
                <ArrowUpwardIcon fontSize="small" color="success" /> {profit}%
              </Button>
            </Tooltip>
          )}
          
          {profit < 0 && (
            <Tooltip title={tooltip} arrow>
              <Button>
                <ArrowDownwardIcon fontSize="small" color="error" /> {profit}%
              </Button>
            </Tooltip>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}
