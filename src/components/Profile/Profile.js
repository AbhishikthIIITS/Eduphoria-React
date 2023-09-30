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
        if (userData && userData.enrolledCourses) {
          const courseIds = userData.enrolledCourses;

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
            <div class="user-details">
              <h1 class="user-name">User Profile</h1>
              <div class="user-info">
                <div class="info-item">
                  <span class="info-label">First Name:</span>
                  <span class="info-value">{user.firstName}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Last Name:</span>
                  <span class="info-value">{user.lastName}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Email:</span>
                  <span class="info-value">{user.email}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Phone Number:</span>
                  <span class="info-value">{user.phoneNo}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Date of Birth:</span>
                  <span class="info-value">{user.dob}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Address:</span>
                  <span class="info-value">{user.address}</span>
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

      {user.role===1 && (<><h1>Teacher Home Page</h1></>)}
    </>
  );
};

export default Profile;
