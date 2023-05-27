"use client";
import StatusHeader from "./StatusHeader";
import ControlAndChartsPanel from "./ControlAndChartsPanel";
import ArrivalsData, { ArrivalsDataType } from "./ArrivalsData";

export default function ScheduleAnalyzer() {

  return (
    <div className="baseAppPanel">
      <StatusHeader />
      <ControlAndChartsPanel />
    </div>
  );
}
