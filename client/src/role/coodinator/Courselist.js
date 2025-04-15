import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function Courselist({ res, id }) {
  function showcourselistfn(e) {
    console.log(e.target);
  }

  return (
    <Card
      key={res._id}
      id={id}
      onClick={(e) => showcourselistfn(e)}
      sx={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
        },
        maxWidth: "90%", // Makes the card wider
        margin: "24px auto", // More spacing between cards
        overflow: "hidden",
        height: "400px", // Taller cards
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%", // Ensures content centers vertically
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3" // Larger title
          sx={{
            fontWeight: "bold",
            mb: 2,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
          onClick={(e) => showcourselistfn(e)}
          id={id}
        >
          {res.title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontSize: "1.5rem", // Larger text for description
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
          }}
          onClick={(e) => showcourselistfn(e)}
          id={id}
        >
          {res.description}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 1, fontSize: "1.2rem", textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}
          onClick={(e) => showcourselistfn(e)}
          id={id}
        >
          Language: {res.language}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 1, fontSize: "1.2rem", textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}
          onClick={(e) => showcourselistfn(e)}
          id={id}
        >
          Creator: {res.creater}
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "1.2rem", textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)" }}
          onClick={(e) => showcourselistfn(e)}
          id={id}
        >
          Duration: {res.duration}
        </Typography>
      </CardContent>
    </Card>
  );
}
