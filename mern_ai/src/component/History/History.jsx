import React from 'react'
import styles from './History.module.css'
import PercentIcon from '@mui/icons-material/Percent';
import { Skeleton } from '@mui/material';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios.js';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext.jsx';

const History = () => {

  const [data, setData] = useState([]);
  const [loadder, setLoader] = useState(false);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoader(true);
      try {
        const results = await axios.get(`/api/resume/get/${userInfo._id}`);
        console.log(results.data.resumes);
        setData(results.data.resumes);
      } catch (err) {
        console.log(err);
        alert("Failed to fetch history data");
      } finally {
        setLoader(false);
      }
      fetchUserData()
    }
  }, [])
  

  return (
    <div className={styles.History}>

      <div className={styles.HistoryCardBlock}>

        {
          loadder && <>
            <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
            <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
            <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />
            <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />

          </>
        }

        {
          data.map((item, index) => {
            return (
              <div key={item._id} className={styles.HistoryCard}>
                <div className={styles.cardPercentage}>{item.score}<PercentIcon sx={{ fontSize: 25 }} /></div>
                {/*<h2>Frontend Developer</h2>*/}
                <p>Resume Name: {item.resume_name}</p>
                <p>{item.feedback}</p>
                <p>Dated: {item.createAt.slice(0, 10)}</p>
              </div>
            );
          })
        }

      </div>

    </div>
  )
}

export default WithAuthHOC(History)
