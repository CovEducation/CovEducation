import React, { useState } from "react";
import styled from "styled-components";
import MentorRequestFrame from "./MentorRequestFrame.js";
import Modal from "../../components/Modal";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { connectHits } from "react-instantsearch-dom";

const GridListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  height: 100%;
`;

const StyledGridList = styled(GridList)`
`;

const MentorGrid = ({ hits }) => {
  const [selectedMentor, setSelectedMentor] = useState({
    mentor: null,
    open: false,
  });

  const handleOpen = (mentor) => {
    setSelectedMentor({ mentor: mentor, open: true });
  };

  const handleClose = () => {
    setSelectedMentor({ open: false });
  };

  // A grid of mentor components.
  return (
    <GridListContainer>
      <StyledGridList cellHeight={180} cols={3}>
        {hits.map((mentor) => {
          return (
            <GridListTile key={mentor._id}>
              <img
                src={
                  mentor.avatar || `${process.env.PUBLIC_URL}/stock-profile.png`
                }
              />
              <GridListTileBar
                title={mentor.name}
                subtitle={<span> {mentor.subjects.join(", ")} </span>}
                actionIcon={
                  <IconButton onClick={() => handleOpen(mentor)}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          );
        })}
      </StyledGridList>
      <Modal
        title={(selectedMentor.mentor && selectedMentor.mentor.name) || ""}
        open={selectedMentor.open}
        handleClose={handleClose}
        trigger={<></>}
      >
        <MentorRequestFrame mentor={selectedMentor.mentor} />
      </Modal>
     </GridListContainer>
  );
};

const MentorHits = connectHits(MentorGrid);

export default MentorHits;
