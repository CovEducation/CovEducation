import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import Button from '../../components/Button';
import useAuth from "../../providers/AuthProvider";
import { getTrailingCommentRanges } from 'typescript';



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
  console.log("request", request);
  
  const { getRequestList,user,acceptRequest, rejectRequest, updateSessionHoursss, archiveRequest, updateRatings } = useAuth();
  const [serverError, setServerError] = useState(false);  
  const [sessionHours, setsessionHours] = useState([]);
  const [ratings, setRatings] = useState([]);

    useEffect(() => {
      getRequestList()
    }, []);
  
    const onPressAccept = (messageId) => {
      acceptRequest(messageId, 'Active')
    }
    console.log("requestOther", requestOther);
    const getDate = (d) => {
      console.log("d", d._seconds);
      var a = new Date(d._seconds * 1000);
      return ("0" + a.getDate()).slice(-2) + "/" + ("0" + a.getMonth()).slice(-2) + "/" + a.getFullYear();
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
        alert("Please add session hours to continue.");
        return;
      }
      else{
        console.log(sessionVal);
        var rec = sessionVal;
        if(rec.val == "")
        {
          alert("Please add session hours to continue.");
          return;
        }
        else {
          updateSessionHoursss(rec.messageId, rec.val, rec.student)
        }
      }
    }

    const addRatings = () => {
      var ratingsVal = ratings;
      if(ratingsVal.length == 0)
      {
        alert("Please add ratings to continue.");
        return;
      }
      else{
        console.log(ratingsVal);
        var rec = ratingsVal;
        if(rec.val == "")
        {
          alert("Please add ratings to continue.");
          return;
        }
        else {
          updateRatings(rec.messageId, rec.val, rec.student)
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
              <Button theme='accent' size='md' onClick={() =>  acceptRequest(item.messageId, "Active", item.studentDetails.name)}> Accept </Button>
            }
            {!item.accepted && 
              <Button theme='danger' size='md' onClick={() =>  rejectRequest(item.messageId, "Rejected", item.studentDetails.name)}> Reject </Button>
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
              <Button theme='danger' size='md' onClick={() =>  archiveRequest(item.messageId, "Archived", item.studentDetails.name)}> End Membership </Button>
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
            <p><b>Session Hours: </b><span>{item.studentDetails.sessionHours}</span></p>
            {user.role === 'MENTOR' && 
              <p><b>Ratings: </b><span>{getRatingsFixed(item.studentDetails.ratings)}</span></p>
            }
            {user.role === 'PARENT' && 
              <p><b>Avg. Ratings: </b><span>{getRatingsFixed(item.mentorDetails.avgRatings)}</span></p>
            }
            {(user.role === 'MENTOR' && item.requestStatus === "Active") && 
                <div>
                  <p><b>Session Hours: </b>
                  <input type="number" id="sessionHours" onChange={(e) => {setsessionHours({val:e.target.value,student:item.studentDetails.name,messageId:item.messageId});}}></input>
                  </p>
                  <Button theme='accent' size='md' onClick={() => updateSessionHourss()}>Submit Session Hours</Button>
                </div>
            }
            {(user.role === 'PARENT' && item.requestStatus === "Active") && 
              <div>
                <p><b>Rate my last session: </b>
                <input type="number" id="ratingsInput" onChange={(e) => {setRatings({val:e.target.value,student:item.studentDetails.name,messageId:item.messageId});}} max="5"></input>
                </p>
                <Button theme='accent' size='md' onClick={() => addRatings()}>Submit Ratings</Button>
              </div>
            }
          </div>
        </RequestsWrapper> 
    );



  return (
    <RequestsPageWrapper>
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
