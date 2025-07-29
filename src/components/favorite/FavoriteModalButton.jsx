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
      <div className="fixed bottom-24 right-8 z-41 flex flex-col items-end gap-2">
        <Tooltip title="Show favorites" placement="left" arrow>
          <Button onClick={() => setOpen(true)} sx={{ minWidth: 56, minHeight: 56, borderRadius: "50%", boxShadow: 3, backgroundColor: "var(--card)", color: "var(--foreground)", border: "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, transition: "background 0.2s, color 0.2s", '&:hover': { backgroundColor: "var(--muted)", }, }}>
            <Favorite color="error" fontSize="large" />
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
