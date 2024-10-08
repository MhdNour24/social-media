import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from "@mui/material"; // تم التعديل هنا
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material"; // تم تصحيح استدعاء الأيقونات
import { useSelector, useDispatch } from "react-redux";
import { setMode, setLogout } from "../../state/index";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const NabBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const neutrallLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user?.firstName || "No"} ${user?.lastName || "User"}`;

  return (
    <FlexBetween padding={"1rem 6%"} backgroundColor={alt} gap={"4rem"}>
      <FlexBetween gap={"1.75rem"}>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          onClick={() => {
            navigate("/home");
          }}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Sociopedia
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutrallLight}
            borderRadius={"9px"}
            gap={"3rem"}
            padding={"0.1rem 1.5rem"}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* desktop nav */}
      {isNonMobileScreens ? (
        <FlexBetween gap={"1.5rem"}>
          <IconButton
            onClick={() => {
              dispatch(setMode());
            }}
            sx={{ fontSize: "25px" }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }}></DarkMode>
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }}></LightMode>
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }}></Message>
          <Notifications sx={{ fontSize: "25px" }}></Notifications>
          <Help sx={{ fontSize: "25px" }}></Help>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutrallLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                paddingRight:"2rem",
                "& .MuiSvgIcon-root:": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSvgSelect-select:focus": {
                  backgroundColor: neutrallLight,
                },
              }}
              input={<InputBase></InputBase>}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setLogout());
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => {
            setIsMobileMenuToggled(!isMobileMenuToggled);
          }}
        >
          <Menu></Menu>
        </IconButton>
      )}
      {/* mobile nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" paddingTop={"1rem"} paddingRight={"0.5rem"}>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutrallLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  paddingRight:"2rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutrallLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NabBar;
