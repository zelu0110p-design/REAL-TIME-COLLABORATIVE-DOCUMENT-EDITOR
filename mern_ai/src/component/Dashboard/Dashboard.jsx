import React from 'react'
import styles from './Dashboard.module.css'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import {Skeleton} from '@mui/material';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { useState } from 'react';
import axios from '../../utils/axios.js';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext.jsx';

const Dashboard = () => {
  Dashboard.displayName = "Dashboard";


  const [uploadFiletext, setUploadFiletext] = useState("Upload Your Resume");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const {userInfo} = useContext(AuthContext);



  const handleOnChangeFile = (e) => {
    setResumeFile(e.target.files[0]);
    setUploadFiletext(e.target.files[0].name);
  }
  const handleUpload = async() => {
    setResult(null);
    if (!jobDesc || !resumeFile) {
      alert("Please upload resume and job description");
      return;
    }
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDesc", jobDesc);
    formData.append("user",userInfo._id);
    setLoading(true);
    try{
        const result = await axios.post('/api/resume/analyze', formData);
        setResult(result.data.data);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLeft}>
        <div className={styles.DashboardHeaderTitle}>
          Smart Resume Screening
        </div>
        <div className={styles.DashboardHeaderLargeTitle}>
          Resume Match Score
        </div>

        <div className={styles.alertInfo}>
          <div>🔔 Important Instrusctrion:</div>
          <div className={styles.dashboardInstruction}>
            <div>
              📄Please paste the complete job description in the "Job
              Description" field before submitting.
            </div>
            <div>📑 Upload resumes in (.pdf) format only. </div>
          </div>
        </div>

        <div className={styles.DashboardUploadResume}>
          <div className={styles.DashboardResumeBlock}>Upload Resumes Here</div>
          <div className={styles.DashboardInputField}>
            <label htmlFor="inputField" className={styles.analyzeAIBtn}>
              {uploadFiletext}
            </label>
            <input
              type="file"
              accept=".pdf"
              id="inputField"
              onChange={handleOnChangeFile}
            />
          </div>
        </div>

        <div className={styles.jobDesc}>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            className={styles.textArea}
            placeholder="Paste You Job Description"
            rows={10}
            cols={50}
          ></textarea>
          <div className={styles.AnalyzeBtn} onClick={handleUpload}>
            Analyze
          </div>
        </div>
      </div>

      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
          <div>Analyze With AI </div>

          <img
            className={styles.profileImg}
            src={
              userInfo?.photoURL
            }
            alt="Profile"
          ></img>

          <h2>{userInfo?.name}</h2>
        </div>

        {result && (
          <div className={styles.DashboardRightTopCard}>
            <div>Result</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <h1>{result?.score}% </h1>
              <CreditScoreIcon sx={{ fontSize: 35 }} />
            </div>

            <div className={styles.feedback}>
              <h2>FeedBack</h2>
              <p>{result?.feedback}</p>
            </div>
          </div>
        )}

        {loading && (
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "20" }}
            width={280}
            height={280}
          />
        )}
      </div>
    </div>
  );
}

export default WithAuthHOC(Dashboard)
