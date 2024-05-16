
import Geolocation from "@/component/geolocation";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Home() {
  return (
    <Box>
      <Typography variant="h5">
        Geo Location
      </Typography>
      <Geolocation/>
    </Box>
  );
}
