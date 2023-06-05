"use client";
import { ApexOptions } from "apexcharts";

export default function ArrVCovChartOptions(maxY: number) {
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp: number) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: undefined,
          },
          png: {
            filename: undefined,
          },
        },
        autoSelected: "zoom",
      },
      id: "cov-v-arr",
      animations: {
        enabled: false,
        easing: "easeinout",
        speed: 250,
        animateGradually: {
          enabled: false,
          delay: 30,
        },
        dynamicAnimation: {
          enabled: false,
          speed: 350,
        },
      },
    },
    title: {
      text: "Arrivals vs Coverage",
      align: "center",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },
    stroke: {
      curve: "straight",
      width: [3, 3],
    },
    markers: {
      size: [5, 5],
      shape: "square",
    },
    xaxis: {
      title: {
        text: "Hour of Day",
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      categories: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24,
      ],
    },
    yaxis: {
      min: 0.0,
      max: maxY,
      forceNiceScale: true,
      decimalsInFloat: 0,
      title: {
        text: "RVUs/Hour",
        style: {
          fontSize: "12px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
    },
  };

  return options;
}
