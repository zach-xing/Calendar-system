import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import { useFetchUserIncrement } from "@/api";
import { Card } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

/**
 * 主页
 */
const Home: React.FC = () => {
  const { homeData, isFetchDataLoading } = useFetchUserIncrement();

  return (
    <div>
      <h2>主页</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <div style={{ width: "48%" }}>
          <Card title='当天用户增长数（个）'>
            <div style={{ fontSize: "5em" }}>{homeData?.day}</div>
          </Card>
        </div>
        <div style={{ width: "48%" }}>
          <Line
            options={options}
            data={{
              labels: ["前五天", "前四天", "前三天", "前天", "昨天", "今天"],
              datasets: [
                {
                  label: "本周用户活跃度",
                  data: homeData?.week,
                  borderColor: "rgb(53, 162, 235)",
                  backgroundColor: "rgba(53, 162, 235, 0.5)",
                },
              ],
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Line
          options={options}
          data={{
            labels: Array.from(
              { length: dayjs().daysInMonth() },
              (_, i) => i + 1
            ),
            datasets: [
              {
                label: "本月用户日增量",
                data: homeData?.month,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Home;
