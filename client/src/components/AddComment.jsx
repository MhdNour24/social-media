import { Box, Button, InputBase, useTheme } from "@mui/material";
import { useState } from "react";
import FlexBetween from "../components/FlexBetween";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "../state";
import {BASE_URL} from "../utils/constant"

const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const token = useSelector((state) => state.token);
  const changeComment = (event) => {
    setComment(event.target.value);
  };
  const addCommentFunc = async () => {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentText: comment }),
    });
    const data = await response.json();
    if(data?.message) {
        console.log(data.message);
        return 
    }
    dispatch(setPost({post:data}))
    setComment("")
  };

  return (
    <Box mt="1rem">
      <FlexBetween>
        <InputBase
          multiline
          placeholder="Add a comment..."
          value={comment}
          onChange={changeComment}
          sx={{
            width: "100%",
            padding: "0.5rem 1rem",
            backgroundColor: palette.background.alt,
            borderRadius: "0.75rem",
            border: `1px solid ${palette.neutral.light}`,
            color: main,
          }}
        />
        <Button
          variant="contained"
          disabled={!comment}
          sx={{
            marginLeft: "1rem",
            backgroundColor: primary,
            color: palette.background.alt,
            "&:hover": { backgroundColor: primary },
          }}
          onClick={addCommentFunc}
        >
          Add
        </Button>
      </FlexBetween>
    </Box>
  );
};

export default AddComment;
