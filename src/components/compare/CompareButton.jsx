import { useState } from "react";
import CompareModal from "./CompareModal";
import { Button, Tooltip } from "@mui/material";
import { MdCompare } from "react-icons/md";

export const CompareButton = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      {isOpenModal && <CompareModal open={isOpenModal} onClose={() => setIsOpenModal(false)} />}

      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 40,
        }}
      >
        <Tooltip title="Compare pokemon" placement="left" arrow>
          <Button
            onClick={() => setIsOpenModal(!isOpenModal)}
            {...props}
            sx={{
              borderRadius: "50%",
              minWidth: 56,
              minHeight: 56,
              boxShadow: 3,
            }}
            color="primary"
            variant="contained"
          >
            <MdCompare size={28} />
          </Button>
        </Tooltip>
      </div>
    </>
  );
};
