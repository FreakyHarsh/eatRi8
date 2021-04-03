import { Box, Typography } from "@material-ui/core";
import React from "react";

interface RecipeProps {
  imageUrl: string;
  name: string;
  recipeUrl: string;
}
export const Recipe = ({ imageUrl, name, recipeUrl }: RecipeProps) => {
  return (
    <Box display='flex' gridGap={"1rem"}>
      <div style={{ minWidth: "3rem", width: "3rem", height: "3rem" }}>
        <img
          src={imageUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }}
        />
      </div>
      <Box display='flex' flexDirection='column'>
        <Typography>{name}</Typography>
        <a href={recipeUrl} target='_blank'>
          Recipe
        </a>
      </Box>
    </Box>
  );
};
