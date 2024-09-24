import { Box, useMediaQuery } from "@mui/material";
import NavBar from "../navbar/index";
import UserWidget from "../Widgets/UserWidget";
import { useSelector } from "react-redux";
import MyPostWidget from "../Widgets/MyPostWidget";
import PostsWidget from "../Widgets/PostsWidget";
import AdvertWidget from "../Widgets/AdvertWidget";
import FriendListWidget from "../Widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <div>
      <NavBar></NavBar>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath}></UserWidget>
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath}></MyPostWidget>
          <PostsWidget userId={_id}></PostsWidget>
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis={"26%"}>
            <AdvertWidget></AdvertWidget>
            <Box m="2rem 0"></Box>
            <FriendListWidget userId={_id}></FriendListWidget>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default HomePage;
