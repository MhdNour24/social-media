import { useState } from "react";
import { Box, Button, Divider, Typography, IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NoCommentsIcon from "@mui/icons-material/SentimentDissatisfied";

const ShowComments = ({
  comments,
  countOfComments,
  maxCountOfCommentsToShowOut = 3,
  mainColor,
}) => {
  const [showAll, setShowAll] = useState(false);

  if (countOfComments === 0) {
    return (
      <Box textAlign="center" my={3}>
        <NoCommentsIcon sx={{ fontSize: 50, color: "gray" }} />
        <Typography variant="h6" color="textSecondary" mt={1}>
          No comments yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        {comments?.map((comment, i) => {
          if (i < maxCountOfCommentsToShowOut || showAll) {
            return (
              <Box key={`name-${i}`} py={1}>
                <Divider />
                <Box display="flex" alignItems="center" mt={1}>
                  <CommentIcon sx={{ color: mainColor, mr: 1 }} />
                  <Typography
                    sx={{ color: mainColor, m: "0.5rem 0", pl: "1rem" }}
                  >
                    {comment}
                  </Typography>
                </Box>
              </Box>
            );
          }
          return null;
        })}
      </Box>
      {countOfComments > maxCountOfCommentsToShowOut && (
        <Box textAlign="center" mt={2}>
          <IconButton onClick={() => setShowAll(!showAll)} color="primary">
            {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <Button onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ShowComments;
