import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import Button from '../../components/Button';
import useAuth from "../../providers/AuthProvider";
import { getTrailingCommentRanges } from 'typescript';
import Toast from "../../components/Toast/index.js";



const RequestsPageWrapper = styled.div`
  padding: 100px;
`;
const FlexClass = styled.div`
  display:grid;
  text-align:center;
`;
const FlexClass1 = styled.div`
  display:grid;
  text-align:center;
  img {
    margin: 0 auto;
  }
`;
const RequestsHeader = styled.div`
  padding-bottom: 48px;
  display: block;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  clear: both;
  div {
    align-items: center;
    margin: 0 auto;
  }

  img {
    border-radius: 50%;
    margin-right: 50px;
  }

  h1 {
    font-size: 45px;
    margin: 0;
  }

  p {
    font-size: 24px;
    margin: 0;
  }
`;
const RequestsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  width: 50%;
  float: left;
  justify-content: center;
`;
const RequestsWrapperPending = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  width: 50%;
  float: left;
  justify-content: center;
`;
const RequestDetailsBlock = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  p {
    font-size: 24px;
  }
  span {
    color:${COLORS.blue};
    border-bottom : 2px solid;
  }
`;

const UserPicture = styled.img`
  margin-right: 50px;
`;

const NoRequest = styled.p`
  text-align: center
`;

const RequestsDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 300px;
  grid-template-rows: 60px 60px 60px;
  gap: 20px 100px;
`;

const BlueColor = styled.span`
  color: blue;
`;
const GreenColor = styled.span`
  color: green;
`;
const YellowColor = styled.span`
  color: #9c27b0;
`;
const RedColor = styled.span`
  color: red;
`;

const RequestsPage = ({ request, requestOther }) => {
  
  const { getRequestList,user,acceptRequest, rejectRequest, updateSessionHoursss, archiveRequest, updateRatings } = useAuth();
  const [serverError, setServerError] = useState(false);  
  const [sessionHours, setsessionHours] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
    useEffect(() => {
      getRequestList()
    }, []);
  
    const onPressAccept = (messageId) => {
      acceptRequest(messageId, 'Active')
    }
    const getDate = (d) => {
      var a = new Date(d);
      return ("0" + a.getDate()).slice(-2) + "/" + ("0" + a.getMonth()+1).slice(-2) + "/" + a.getFullYear();
    }

    const hasRequests = () => {
      return request.result.length > 0;
    }

    const hasNoRequests = () => {
      return request.result.length == 0;
    }

    const updateSessionHourss = () => {
      var sessionVal = sessionHours;
      if(sessionVal.length == 0)
      {
        setStatus("error");
        setMessage("Please add session hours to continue.");
        setToastOpen(true);
        setTimeout(() => {
          setToastOpen(false);
        }, 3000);
        // alert("Please add session hours to continue.");
        return;
      }
      else{
        var rec = sessionVal;
        if(rec.val == "")
        {
          setStatus("error");
          setMessage("Please add session hours to continue.");
          setToastOpen(true);
          setTimeout(() => {
            setToastOpen(false);
          }, 3000);
          return;
        }
        else {
          updateSessionHoursss(rec.messageId, rec.val, rec.student).then(() => {
            setStatus("success");
            setMessage("Session Hours Updated.");
            setToastOpen(true);
            setTimeout(() => {
              setToastOpen(false);
            }, 3000);
          })
        }
      }
    }

    const addRatings = () => {
      var ratingsVal = ratings;
      if(ratingsVal.length == 0)
      {
        setStatus("error");
        setMessage("Please add ratings to continue.");
        setToastOpen(true);
        setTimeout(() => {
          setToastOpen(false);
        }, 3000);
        return;
      }
      else{
        var rec = ratingsVal;
        if(rec.val == "")
        {
          setStatus("error");
          setMessage("Please add ratings to continue.");
          setToastOpen(true);
          setTimeout(() => {
            setToastOpen(false);
          }, 3000);
          return;
        }
        else {
          updateRatings(rec.messageId, rec.val, rec.student).then(() => {
            setStatus("success");
            setMessage("Rating Updated.");
            setToastOpen(true);
            setTimeout(() => {
              setToastOpen(false);
            }, 3000);
          })
        }
      }
    }

    const getRatingsFixed = (d) => {
      var a = parseFloat(d);
      if(d == 0)
      {
        return 0;
      }
      return a.toFixed(1);
    }

    const pendingRequestsList = request && request.result.map((item) =>
      item.requestStatus === "Pending" && 
        <RequestsWrapperPending>
          <UserPicture src="http://via.placeholder.com/115" alt="profile pic" />
          <div>
            <p> <b>Student: </b>{ item.studentDetails.name} </p>
            {user.role === 'MENTOR' ? 
              (<p>
                <b>Parent: </b>
                {item.parentDetails.name}
              </p>):(
                <p>
                <b>Mentor: </b>
                {item.mentorDetails.name}
              </p>
              )
            }
            <p> <b>Date Requested: </b> {getDate(item.requestedDate)}</p>
            <p> <b>Status: </b>
              {item.requestStatus === "Pending" &&
                <BlueColor>{item.requestStatus}</BlueColor>
              }
            </p>
            {/* <p> { user.role === 'MENTOR' ? item.studentDetails.email  : item.mentorDetails.major} </p>
            <p> { user.role === 'MENTOR' ? item.parentDetails.phone  : item.mentorDetails.college} </p> */}
          </div>
          {/* <RequestDetailsBlock>
          <div>
            <p>Date Requested:</p>
            // {}
            <p>Status: <span>{item.requestStatus}</span></p>
          </div>
          </RequestDetailsBlock> */}
          {user.role === 'MENTOR' && 
          <RequestDetailsBlock>
            {!item.accepted && 
              <Button theme='accent' size='sm' onClick={() =>  acceptRequest(item.messageId, "Active", item.studentDetails.name).then(() => {
                setStatus("success");
                setMessage("Request Accepted");
                setToastOpen(true);
                setTimeout(() => {
                  setToastOpen(false);
                }, 3000);
              })}> Accept </Button>
            }
            {!item.accepted && 
              <Button theme='danger' size='sm' onClick={() =>  rejectRequest(item.messageId, "Rejected", item.studentDetails.name).then(() => {
                setStatus("success");
                setMessage("Request Rejected");
                setToastOpen(true);
                setTimeout(() => {
                  setToastOpen(false);
                }, 3000);
              })}> Reject </Button>
            }
          </RequestDetailsBlock>
          }
        </RequestsWrapperPending> 
    );

    const otherRequestsList = request && request.result.map((item) =>
      (item.requestStatus === "Active" || item.requestStatus === "Archived" || item.requestStatus === "Rejected")  && 
        <RequestsWrapper>
          {(user.role === 'PARENT' && item.requestStatus === "Active") && 
            <FlexClass1>
              <UserPicture src="http://via.placeholder.com/115" alt="profile pic" />
              <Button theme='danger' size='sm' onClick={() =>  archiveRequest(item.messageId, "Archived", item.studentDetails.name).then(() => {
                setStatus("success");
                setMessage("Request Archived");
                setToastOpen(true);
                setTimeout(() => {
                  setToastOpen(false);
                }, 3000);
              })}> End Membership </Button>
            </FlexClass1>
           }
           {(user.role === 'MENTOR' && item.requestStatus === "Active") && 
            <FlexClass>
              <UserPicture src="http://via.placeholder.com/115" alt="profile pic" />
            </FlexClass>
           }
           {((user.role === 'PARENT' || user.role === 'MENTOR') && item.requestStatus !== "Active") && 
            <FlexClass>
              <UserPicture src="http://via.placeholder.com/115" alt="profile pic" />
            </FlexClass>
           }
          <div>
            <p> <b>Student: </b>{ item.studentDetails.name} </p>
            <p> <b>Mentor: </b> {item.mentorDetails.name} </p>
            <p><b>Date: </b> {getDate(item.requestStatus=="Active"?item.acceptedDate:item.requestStatus=="Archived"?item.archivedDate:item.rejectedDate)}</p>
            <p> <b>Status: </b>
              {item.requestStatus === "Active" &&
                <GreenColor>{item.requestStatus}</GreenColor>
              }
              {item.requestStatus === "Archived" &&
                <YellowColor>{item.requestStatus}</YellowColor>
              }
              {item.requestStatus === "Rejected" &&
                <RedColor>{item.requestStatus}</RedColor>
              }
            </p>
            <p><b>Session Hours: </b><span>{item.requestDetails.sessionHours}</span></p>
            {user.role === 'MENTOR' && 
              <p><b>Ratings: </b><span>{item.requestDetails.ratings?getRatingsFixed(item.requestDetails.ratings):0}</span></p>
            }
            {user.role === 'PARENT' && 
              <p><b>Avg. Ratings: </b><span>{getRatingsFixed(item.mentorDetails.avgRatings)}</span></p>
            }
            {(user.role === 'MENTOR' && item.requestStatus === "Active") && 
                <div>
                  <p><b>Session Hours: </b>
                  <input type="number" id="sessionHours" onChange={(e) => {setsessionHours({val:e.target.value,student:item.studentDetails.name,messageId:item.messageId});}}></input>
                  </p>
                  <Button theme='accent' size='sm' onClick={() => updateSessionHourss()}>Submit Session Hours</Button>
                </div>
            }
            {(user.role === 'PARENT' && item.requestStatus === "Active") && 
              <div>
                <p><b>Rate my last session: </b>
                <input type="number" id="ratingsInput" onChange={(e) => {setRatings({val:e.target.value,student:item.studentDetails.name,messageId:item.messageId});}} max="5"></input>
                </p>
                <Button theme='accent' size='sm' onClick={() => addRatings()}>Submit Ratings</Button>
              </div>
            }
          </div>
        </RequestsWrapper> 
    );



  return (
    <RequestsPageWrapper>
        <Toast open={toastOpen} message={message} status={status}/>
      <RequestsHeader>
        <div>
          <h1>Pending Requests</h1>
        </div>
      </RequestsHeader>

      {hasRequests && 
        pendingRequestsList
      }

      <RequestsHeader>
          <div>
            <h1>Mentorships</h1>
          </div>
        </RequestsHeader>

      {hasRequests && 
        otherRequestsList
      }


      
 
    </RequestsPageWrapper>
  )
}

export default RequestsPage;
