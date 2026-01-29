import React from "react";
import styles from "./Admin.module.css";
import PercentIcon from "@mui/icons-material/Percent";
import { Skeleton } from "@mui/material";
import WithAuthHOC from "../../utils/HOC/withAuthHOC";
import { useState, useEffect } from "react";
import axios from "../../utils/axios.js";

const Admin = () => {
  const [data, setData] = useState([]);
  const [loadder, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoader(true);
      try {
        const results = await axios.get(`/api/resume/get`);
        console.log(results.data.resumes);
        setData(results.data.resumes);
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    fetchAllData();
  }, []);
  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>
        {loadder && (
          <>
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={280}
              height={280}
            />
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={280}
              height={280}
            />
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={280}
              height={280}
            />
            <Skeleton
              variant="rectangular"
              sx={{ borderRadius: "20px" }}
              width={280}
              height={280}
            />
          </>
        )}

        {data.map((item) => {
          return (
            <div className={styles.AdminCard}>
              <h2>{item.user?.name}</h2>
              <p style={{ color: "blueviolet" }}>{item.user?.email}</p>
              <h3>
                Score: {item.score}
                <PercentIcon sx={{ fontSize: 20 }} />
              </h3>
              <p>{item.feedback}</p>
              <p>Dated: {item.createdAt.slice(0, 10)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WithAuthHOC(Admin);
