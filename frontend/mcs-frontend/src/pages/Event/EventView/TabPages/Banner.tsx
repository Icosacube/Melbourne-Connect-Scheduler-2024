
import { Box } from "@mui/material";
import React from "react";

interface BannerProps {
  image: string;
}

const Banner: React.FC<BannerProps> = ({ image }) => {
  return (
    <Box
      className="w-full h-72 object-cover bg-gray-400 rounded-t-2xl shadow-lg"
      style={{ objectPosition: "50% 75%" }}
    > 
    {image ? <img src={image} className="object-cover h-full w-full"/> : <></>}
      
    </Box>
  );
};

export default Banner;
