import { Add, Favorite } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import React from "react";

export default function CreateNewPokemonButton({ setOpen }) {
  return (
    <div className="fixed bottom-40 right-8 z-41 flex flex-col items-end gap-2">
      <Tooltip title="Create pokemon" placement="left" arrow>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            minWidth: 56,
            minHeight: 56,
            borderRadius: "50%",
            boxShadow: 3,
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
            border: "2px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            transition: "background 0.2s, color 0.2s",
            "&:hover": { backgroundColor: "var(--muted)" },
          }}
        >
          <Add color="error" fontSize="large" />
        </Button>
      </Tooltip>
    </div>
  );
}
