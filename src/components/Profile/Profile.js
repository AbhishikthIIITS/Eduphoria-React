import React,{useState,useEffect} from "react";
import "./Profile.css";
import Loader from "../Loader/Loader";
import EnrolledCourseList from "../Courses/EnrolledList";
import { useSelector } from "react-redux";

const Profile = () => {
  const user=useSelector((state)=>state.auth.user);
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:8000/user/${user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {
        if (userData) {
          const courseIds = userData.role===0 ? userData.enrolledCourses : userData.teachingCourses;

          const courseForUser = courseIds.map((courseId) =>
            fetch(`http://localhost:8000/courses/${courseId}`).then(
              (response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              }
            )
          );

          Promise.all(courseForUser)
            .then((courseDetails) => {
              setUserCourses(courseDetails);
              
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching course details:", error);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [user.id]);
  

  

  return (
    <>
      {user.role === 0 && (
        <>
          <div className="user-profile">
            <div className="user-details">
              <h1 className="user-name">User Profile</h1>
              <div className="user-info">
                <div className="info-item">
                  <span className="info-label">First Name:</span>
                  <span className="info-value">{user.firstName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Name:</span>
                  <span className="info-value">{user.lastName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone Number:</span>
                  <span className="info-value">{user.phoneNo}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Date of Birth:</span>
                  <span className="info-value">{user.dob}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Address:</span>
                  <span className="info-value">{user.address}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="user-courses">
            {loading ? (
              <Loader />
            ) : (
              <EnrolledCourseList courses={userCourses} />
            )}
          </div>
        </>
      )}

      {user.role===1 && ( <>
          <div className="user-profile">
            <div className="user-details">
              <h1 className="user-name">Teacher Profile</h1>
              <div className="user-info">
                <div className="info-item">
                  <span className="info-label">Full Name:</span>
                  <span className="info-value">{user.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Institute Name:</span>
                  <span className="info-value">{user.instituteName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone Number:</span>
                  <span className="info-value">{user.phoneNo}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Gender:</span>
                  <span className="info-value">{user.gender}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="user-courses">
            {loading ? (
              <Loader />
            ) : (
              <EnrolledCourseList courses={userCourses} />
            )}
          </div>
        </>)}

        {user.role===2 && ( <>
          <div className="user-profile">
            <div className="user-details">
              <h1 className="user-name">Admin Profile</h1>
              <div className="user-info">
                <div className="info-item">
                  <span className="info-label">Full Name:</span>
                  <span className="info-value">{user.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Institute Name:</span>
                  <span className="info-value">{user.instituteName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone Number:</span>
                  <span className="info-value">{user.phoneNo}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Gender:</span>
                  <span className="info-value">{user.gender}</span>
                </div>
              </div>
            </div>
          </div>
        </>)}
    </>
  );
};

export default Profile;
