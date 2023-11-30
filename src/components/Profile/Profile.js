import React, { useState, useEffect, useCallback } from "react";
import "./Profile.css";
import Loader from "../Loader/Loader";
import EnrolledCourseList from "../Courses/EnrolledList";
import { useSelector } from "react-redux";
import Modal from "../../shared/components/FrontendTools/Modal";

const Profile = () => {
  const userinit = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(userinit);
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const fetchUserData = useCallback(() => {
    setLoading(true);
    fetch(`http://localhost:8000/user/${user.id}`)
      .then((response) => response.json())
      .then((userData) => {
        if (userData) {
          const courseIds =
            userData.role === 0
              ? userData.enrolledCourses
              : userData.teachingCourses;

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

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const openEditModal = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const saveEditedUser = () => {
    fetch(`http://localhost:8000/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log("User updated successfully:", updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
        fetchUserData();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

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
                <button onClick={openEditModal} className="edit-btn">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <Modal
            show={isEditing}
            onCancel={closeEditModal}
            header="Edit Profile"
            footerClass="modal__footer-profile"
            footer={
              <React.Fragment>
                <button onClick={saveEditedUser} className="edit-btn">
                  Save
                </button>
                <button onClick={closeEditModal} className="logout-btn">
                  Cancel
                </button>
              </React.Fragment>
            }
          >
            <div className="profile-item">
              <span className="profile-label">First Name:</span>
              <input
                type="text"
                value={editedUser.firstName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, firstName: e.target.value })
                }
              />
            </div>
            <div className="profile-item">
              <span className="profile-label">Last Name:</span>
              <input
                type="text"
                value={editedUser.lastName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, lastName: e.target.value })
                }
              />
            </div>
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <input
                type="text"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </div>
            <div className="profile-item">
              <span className="profile-label">Phone Number:</span>
              <input
                type="text"
                value={editedUser.phoneNo}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phoneNo: e.target.value })
                }
              />
            </div>
            <div className="profile-item">
              <span className="profile-label">Date of Birth:</span>
              <input
                type="text"
                value={editedUser.dob}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, dob: e.target.value })
                }
              />
            </div>
            <div className="profile-item">
              <span className="profile-label">Address:</span>
              <input
                type="text"
                value={editedUser.address}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, address: e.target.value })
                }
              />
            </div>
          </Modal>

          <div className="user-courses">
            {loading ? (
              <Loader />
            ) : (
              <EnrolledCourseList courses={userCourses} />
            )}
          </div>
        </>
      )}

      {user.role === 1 && (
        <>
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
                <button onClick={openEditModal} className="edit-btn">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <Modal
            show={isEditing}
            onCancel={closeEditModal}
            header="Edit Profile"
            footerClass="modal__footer-profile"
            footer={
              <React.Fragment>
                <button onClick={saveEditedUser} className="edit-btn">
                  Save
                </button>
                <button onClick={closeEditModal} className="logout-btn">
                  Cancel
                </button>
              </React.Fragment>
            }
          >
            <div className="profile-item">
              <span className="profile-label">FullName:</span>
              <input
                type="text"
                value={editedUser.fullName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, fullName: e.target.value })
                }
              />
            </div>
            <div className="profile-item">
              <span className="profile-label">Institute Name:</span>
              <input
                type="text"
                value={editedUser.instituteName}
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    instituteName: e.target.value,
                  })
                }
              />
            </div>
            <div className="profile-item">
              <span className="profile-label">Email:</span>
              <input
                type="text"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </div>
            <div className="profile-item">
              <span className="profile-label">Phone Number:</span>
              <input
                type="text"
                value={editedUser.phoneNo}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phoneNo: e.target.value })
                }
              />
            </div>
            <div className="profile-item">
              <span className="profile-label">Gender:</span>
              <input
                type="text"
                value={editedUser.gender}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, gender: e.target.value })
                }
              />
            </div>
          </Modal>
          <div className="user-courses">
            {loading ? (
              <Loader />
            ) : (
              <EnrolledCourseList courses={userCourses} />
            )}
          </div>
        </>
      )}

      {user.role === 2 && (
        <>
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
        </>
      )}
    </>
  );
};

export default Profile;
