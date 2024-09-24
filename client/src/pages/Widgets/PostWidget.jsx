import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state";
import ShowComments from "../../utils/ShowComments";
import AddComment from "../../components/AddComment";
import {BASE_URL} from "../../utils/constant"

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const countOfLikes = Object.keys(likes).length;
  const countOfComments = comments.length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      ></Friend>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {" "}
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="400px"
          alt="Post"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
            objectFit: "fill",
          }}
          src={`${BASE_URL}/assets/${picturePath}`}
        ></img>
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }}></FavoriteOutlined>
              ) : (
                <FavoriteBorderOutlined></FavoriteBorderOutlined>
              )}
            </IconButton>
            <Typography>{countOfLikes}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => {
                setIsComments(!isComments);
              }}
            >
              <ChatBubbleOutlineOutlined></ChatBubbleOutlineOutlined>
            </IconButton>
            <Typography>{countOfComments}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box>
          <AddComment postId={postId}></AddComment>
          <Box mt="0.5rem">
            <ShowComments
              comments={comments}
              countOfComments={countOfComments}
              mainColor={main}
            ></ShowComments>
            <Divider />
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
