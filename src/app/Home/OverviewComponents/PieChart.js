import React from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "../page.module.css"

function PieChart({ chartData }) {
  return (
    <div className={styles.pieChart}>
      <Doughnut
        styles={{width: "100%"}}
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Machine Status"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;