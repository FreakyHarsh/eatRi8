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
      <div style={{ width: "3rem" }}>
        <img
          src={imageUrl}
          alt={name}
          style={{ width: "100%", objectFit: "cover", borderRadius: 10 }}
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
