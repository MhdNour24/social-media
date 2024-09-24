import {
  PersonAddRounded,
  PersonRemoveRounded,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../state/index";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constant"

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends) || [];

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend =
    Array.isArray(friends) && friends.find((friend) => friend._id === friendId);
  //   const isFriend = friends.includes(friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `${BASE_URL}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px"></UserImage>
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0); // to refresh the page
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.li,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      { (_id!==friendId) ? (<IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveRounded
            sx={{ color: primaryDark }}
          ></PersonRemoveRounded>
        ) : (
          <PersonAddRounded sx={{ color: primaryDark }}></PersonAddRounded>
        )}
      </IconButton>) : null}
    </FlexBetween>
  );
};

export default Friend;
