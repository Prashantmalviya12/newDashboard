import React, { useEffect, useState } from "react";
import './Profile.css'
import axios from "axios";

const Profile = () => {
  const userId = localStorage.getItem('userId');
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/user/${userId}`);
        console.log(res.data);
        
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchUserDetail();
  }, [userId]);
  console.log("data",data);
  
  
  return (
    <div className="">
      <div className="card">
        <h5 className="text-center mb-4">User Details</h5>
        <form className="form-card" onSubmit={(e) => e.preventDefault()}>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <label className="form-control-label px-3">Full name</label>
              <input type="text" value={data?.fullName || ''} disabled />
            </div>
            <div className="form-group col-sm-6 flex-column d-flex">
              <label className="form-control-label px-3">
                Email<span className="text-danger"> *</span>
              </label>
              <input type="text" value={data?.email || ''} disabled />
            </div>
          </div>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <label className="form-control-label px-3">Date Of Birth</label>
              <input type="text" value={data?.DOB || ''} disabled />
            </div>
            <div className="form-group col-sm-6 flex-column d-flex">
              <label className="form-control-label px-3">Gender</label>
              <input type="text" value={data?.gender || ''} disabled />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
