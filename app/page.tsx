"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { DepartmentConfigurationType, PostLoginDataContext } from "@/context/context";
import { UUID } from "crypto";
import { useContext } from "react";


export default function Home() {
  const router = useRouter();
  const user_id = "779a66e9-10fd-47e5-bfda-870ab4a7b5a4";
  const postLoginDataContext = useContext(PostLoginDataContext);

  async function getPostLoginData(user_id: UUID, post_login_data_callback: (postLoginDataRet: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>) => void) {

    const now: Date = new Date();
    const get_dept_config_url = "http://localhost:8080/post_login_info/" + user_id.toString();

    const res = await fetch(get_dept_config_url);

    const deptConfigAPIResp = res.json();

    const deptConfigData = await Promise.all([deptConfigAPIResp]);

    const deptConfigurations: Map<string, Map<string, Map<string, DepartmentConfigurationType>>> =
      new Map<string, Map<string, Map<string, DepartmentConfigurationType>>>();

    deptConfigData[0].forEach((r: any) => {
      if (!deptConfigurations.has(r.client_group_name)) {
        deptConfigurations.set(r.client_group_name, new Map<string, Map<string, DepartmentConfigurationType>>());
      }
      if (!deptConfigurations.get(r.client_group_name)?.has(r.facility_name)) {
        deptConfigurations.get(r.client_group_name)?.set(r.facility_name, new Map<string, DepartmentConfigurationType>());
      }
      if (!deptConfigurations.get(r.client_group_name)?.get(r.facility_name)?.has(r.department_name)) {

        const dpetConfig: DepartmentConfigurationType = {
          department_id: r.department_id,
          department_name: r.department_name,
          data_start_date: new Date(r.data_start_date),
          data_end_date: new Date(r.data_end_date),
          phys_hourly_cost: r.phys_hourly_cost,
          phys_peak_capacity: r.phys_peak_capacity,
          app_hourly_cost: r.app_hourly_cost,
          app_peak_capacity: r.app_peak_capacity,
        };
        deptConfigurations.get(r.client_group_name)?.get(r.facility_name)?.set(r.department_name, dpetConfig);
      }
    });

    post_login_data_callback(deptConfigurations);

  };

  function postLoginDataCallback(postLoginDataRet: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>) {
    console.log("ScheduleAnalyzerLogin.onClickLoginButton");
    postLoginDataContext.setPostLoginData(postLoginDataRet);
    router.push('/schedule-analyzer');
  }

  const onClickLoginButton = () => {
    getPostLoginData(user_id, postLoginDataCallback);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
        <Button variant="outline-primary" onClick={onClickLoginButton} className="setMonthsButtons">Simulated Login</Button>
      </div>
    </main>
  );
}
