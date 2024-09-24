import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NabBar from "../navbar";
import FriendListWidget from "../Widgets/FriendListWidget";
import PostsWidget from "../Widgets/PostsWidget";
import UserWidget from "../Widgets/UserWidget";
import {BASE_URL} from "../../utils/constant"

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line

  if (!user) {
    return null;
  }
  return (
    <Box>
      <NabBar></NabBar>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath}></UserWidget>
          <Box m="2rem 0"></Box>
          <FriendListWidget userId={userId}> </FriendListWidget>
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          sx={{mt:"-30px"}}
        >
          <PostsWidget userId={userId} isProfile={true}></PostsWidget>
        </Box>
      </Box> 
    </Box>
  );
};

export default ProfilePage;
