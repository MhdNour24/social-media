import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";



const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 1.7rem 1.5rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius:"0.75rem"
}));

export default WidgetWrapper
