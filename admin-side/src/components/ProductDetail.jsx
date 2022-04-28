import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

const ProductDetail = ({ products, reviewInfo }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} sx={{ p: { xs: 0, md: 3 } }}>
        <img
          src={products.imgUrl}
          alt={products.title}
          height="100%"
          width="100%"
          style={{ objectFit: "cover" }}
        />
      </Grid>

      <Grid item xs={12} md={7}>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              {products.title}
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              $ {products.price}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Rating
              name="read-only"
              value={reviewInfo.totalRate ? reviewInfo.totalRate : 0}
              readOnly
              precision={0.5}
              size="small"
              sx={{ marginRight: 1 }}
            />
            {`${reviewInfo.totalRate ? reviewInfo.totalRate : 0}`}
          </Stack>

          {products.desc?.split("\n").map((str) => (
            <Typography component="p">{str}</Typography>
          ))}          

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1" component="p">
              Colors
            </Typography>
            {products.color?.map((clr, idx) => (
              <Chip key={idx} label={clr} variant="outlined" />
            ))}
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1" component="p">
              Size
            </Typography>
            {products.size?.map((siz, idx) => (
              <Chip key={idx} label={siz} variant="outlined" />
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
