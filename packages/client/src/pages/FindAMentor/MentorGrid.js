import React, { useState } from "react";
import styled from "styled-components";
import MentorRequestFrame from "./MentorRequestFrame.js";
import GridList from "@material-ui/core/GridList";
import { connectHits } from "react-instantsearch-dom";
import ModalNew from '../../components/ModalNew';
import MentorCard from "./MentorCard.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import useAuth from "../../providers/AuthProvider";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const GridListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  height: 100%;
`;

const StyledGridList = styled(GridList)`
`;

const MentorCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 280px;
    min-width: 180px;
    margin: 0.75rem;
    cursor: pointer;
    height: 280px !important;

    img {
      border-radius:10px;
      width:70%;
  }
`
const MentorCardNameText = styled.h4`
    font-size: 14px;
    margin: 15px 0px 5px;
`
const MentorCardText = styled.p`
    font-size: 12px;
    margin-top: 0;
    margin-bottom: 5px;
`

const MentorGrid = ({ hits }) => {
  const [open, setOpen] = React.useState(false);
  const { sendRequestToMentor } = useAuth();

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

  const handleClick = () => {
    setOpen(true);
  };

  const handleCloses = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const sendRequest = async (email,message) => {
    try {
      await sendRequestToMentor(email,message);
      handleClose();
    } catch (error) {
      console.log(error)
    }
  }
  // A grid of mentor components.
  return (
    <GridListContainer>
       {/* <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleCloses} severity="warning">
          This is a success message!
        </Alert>
      </Snackbar>
      <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
      <StyledGridList cellHeight={180} cols={3}>
        {hits.map((mentor) => {
          return (
            // <GridListTile key={mentor._id}>
            //   <img
            //     src={
            //       mentor.avatar || `${process.env.PUBLIC_URL}/stock-profile.png`
            //     }
            //   />
            //   <GridListTileBar
            //     title={mentor.name}
            //     subtitle={<span> {mentor.subjects.join(", ")} </span>}
            //     actionIcon={
            //       <IconButton onClick={() => handleOpen(mentor)}>
            //         <InfoIcon />
            //       </IconButton>
            //     }
            //   />
            // </GridListTile>
            <MentorCardContainer key={mentor.objectID}>
                <img src={mentor.avatar || `${process.env.PUBLIC_URL}/stock-profile.png`} alt='profile pic' onClick={() => handleOpen(mentor)}/>
                <MentorCardNameText>{mentor.name}</MentorCardNameText>
                <MentorCardText>{mentor.timezone}</MentorCardText>
                {mentor.subjects.length > 0 && 
                  <MentorCardText>{mentor.subjects.join(', ')}</MentorCardText>
                }
                {mentor.gradelevels.length > 0 &&
                  <MentorCardText>{mentor.gradelevels.join(', ')}</MentorCardText>
                }
            </MentorCardContainer>
            
          );
        })}
      </StyledGridList>
      <ModalNew
          title={(selectedMentor.mentor && selectedMentor.mentor.name) || ""}
          open={selectedMentor.open}
          handleClose={handleClose}
          trigger={<></>}
      >
        <MentorRequestFrame mentor={selectedMentor.mentor} onSendRequest={sendRequest}/>
        </ModalNew>
     </GridListContainer>
  );
};

const MentorHits = connectHits(MentorGrid);

export default MentorHits;