"use client";
import { ApexOptions } from "apexcharts";

export default function WeekAtAGlanceChartOptions() {
  const options: ApexOptions = {
    chart: {
      type: "heatmap",
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.4,
        radius: 0,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: [
            { "from": 0, "to": 66, "color": "#0000FF" },
            { "from": 66, "to": 67, "color": "#001AD4" },
            { "from": 67, "to": 68, "color": "#0034BA" },
            { "from": 68, "to": 69, "color": "#004E9B" },
            { "from": 69, "to": 70, "color": "#006881" },
            { "from": 70, "to": 71, "color": "#008168" },
            { "from": 71, "to": 72, "color": "#009B4E" },
            { "from": 72, "to": 73, "color": "#00BA34" },
            { "from": 73, "to": 74, "color": "#00D41A" },
            { "from": 74, "to": 75, "color": "#00FF00" },  // -----
            { "from": 75, "to": 76, "color": "#19FF00" },
            { "from": 76, "to": 77, "color": "#33FF00" },
            { "from": 77, "to": 78, "color": "#4CFF00" },
            { "from": 78, "to": 79, "color": "#66FF00" },
            { "from": 79, "to": 80, "color": "#7FFF00" },
            { "from": 80, "to": 81, "color": "#99FF00" },
            { "from": 81, "to": 82, "color": "#B2FF00" },
            { "from": 82, "to": 83, "color": "#CCFF00" },
            { "from": 83, "to": 84, "color": "#E4FF00" },
            { "from": 84, "to": 95, "color": "#FFFF00" },  // -----
            { "from": 85, "to": 86, "color": "#FFF800" },
            { "from": 86, "to": 87, "color": "#FFED00" },
            { "from": 87, "to": 88, "color": "#FFE100" },
            { "from": 88, "to": 89, "color": "#FFD400" },
            { "from": 89, "to": 90, "color": "#FFC700" },
            { "from": 90, "to": 91, "color": "#FFBA00" },
            { "from": 91, "to": 92, "color": "#FFA700" },
            { "from": 92, "to": 93, "color": "#FF9B00" },
            { "from": 93, "to": 94, "color": "#FF8E00" },
            { "from": 94, "to": 95, "color": "#FF8100" },  // -----
            { "from": 95, "to": 96, "color": "#FF7500" },
            { "from": 96, "to": 97, "color": "#FF6800" },
            { "from": 97, "to": 98, "color": "#FF5B00" },
            { "from": 98, "to": 99, "color": "#FF4E00" },
            { "from": 99, "to": 100, "color": "#FF4100" },
            { "from": 100, "to": 101, "color": "#FF3400" },
            { "from": 101, "to": 102, "color": "#FF2700" },
            { "from": 102, "to": 103, "color": "#FF1A00" },
            { "from": 103, "to": 104, "color": "#FF0D00" },
            { "from": 104, "to": 1000, "color": "#FF0000" }
          ]
          ,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    title: {
      text: "Week-at-a-Glance",
    },
  };

  return options;
}
