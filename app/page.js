import Chart from "../components/Chart.js";

export default async function Home() {
  const datasets = {
    labels: ["Izin", "Hadir", "Alpa", "Sakit"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  await fetch("http://localhost:8000/api/absen")
    .then(async (response) => {
      let {data } = await response.json();
      let izin = 0
      let hadir = 0
      let alfa = 0
      let sakit = 0
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item) => {
          if (item.kehadiran == 'izin') {
            izin++
          } else if (item.kehadiran == 'hadir') {
            hadir++
          } else if (item.kehadiran == 'alfa') {
            alfa++
          } else if (item.kehadiran == 'sakit') {
            sakit++
          }
        });
        datasets.datasets[0].data = [izin, hadir, alfa, sakit]
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Handle errors gracefully, e.g., display an error message
    });

  // useEffect(() => {

  // }, []);

  const options = {
    showAllTooltips: true,
  };

  return (
    <div style={{ width: 300 }}>
      <Chart data={datasets} options={options} />
    </div>
  );
}

// const counts = { izin: 0, hadir: 0, alpa: 0, sakit: 0 };
//       if (Array.isArray(apiData) && apiData.length > 0) {
//         apiData.forEach((item) => {
//           // console.log(item);
//         });
//       }
//       setData({
//         ...data,
//         datasets: [
//           {
//             data: Object.values(counts),
//             backgroundColor: [
//               "rgba(54, 162, 235, 0.2)",
//               "rgba(75, 192, 192, 0.2)",
//               "rgba(255, 99, 132, 0.2)",
//               "rgba(255, 206, 86, 0.2)",
//             ],
//             borderColor: [
//               "rgba(54, 162, 235, 1)",
//               "rgba(75, 192, 192, 1)",
//               "rgba(255, 99, 132, 1)",
//               "rgba(255, 206, 86, 1)",
//             ],
//             borderWidth: 1,
//           },
//         ],
//       });
