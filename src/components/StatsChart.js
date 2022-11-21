import React, { useContext, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { SocketContext } from "../context/SocketContext";

ChartJS.register(ArcElement, Tooltip, Legend);


const StatsChart = () => {
    const {socket, bands, setBands} = useContext(SocketContext);
  useEffect(() => {
    socket.on("current-bands", (data) => {
      console.log(data);
      setBands(data);
     // setBands(data);
    });
    //  setBands(data);
  }, [socket]);
  const data = {
    labels: bands.map(band => band.name),
    datasets: [
      {
        label: "# of Votes",
        data: bands.length > 0 ? bands.map(band => band.votes) : [1, 2, 3 ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

export default StatsChart;