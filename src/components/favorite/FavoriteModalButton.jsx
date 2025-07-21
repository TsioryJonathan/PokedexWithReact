import React, { useState } from "react";
import { Favorite } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import FavoriteModal from "./FavoriteModal";

export default function FavoriteModalButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FavoriteModal open={open} onClose={() => setOpen(false)} />
      <div style={{ position: "fixed", bottom: "6rem", right: "2rem", zIndex: 40 }}>
        <Tooltip title="Show favorites" placement="left" arrow>
          <Button onClick={() => setOpen(true)} style={{ minWidth: 0, borderRadius: "50%", padding: 12, background: "#555" }}>
            <Favorite color="error" fontSize="large" />
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
