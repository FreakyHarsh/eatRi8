import { Box, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { useEffect, useRef, useState } from "react";

interface RecipeProps {
  imageUrl: string;
  name: string;
  recipeUrl: string;
}

export const Recipe = ({ imageUrl, name, recipeUrl }: RecipeProps) => {
  const [imgLoader, setImgLoader] = useState(true);

  return (
    <Box display='flex' gridGap={"1rem"}>
      <div style={{ minWidth: "3rem", width: "3rem", height: "3rem", position: "relative" }}>
        {imgLoader && (
          <Skeleton
            variant='rect'
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: 10, position: "absolute" }}
          />
        )}
        <img
          src={imageUrl}
          onLoad={() => setImgLoader(!imgLoader)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 10,
            position: "absolute",
            top: 0,
          }}
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
