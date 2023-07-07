"use client";

import { useRouter } from "next/navigation";
import { DepartmentConfigurationType, PostLoginDataContext } from "@/context/context";
import { UUID } from "crypto";
import { useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();

  const router = useRouter();
  const postLoginDataContext = useContext(PostLoginDataContext);

  async function getPostLoginData(username: String, post_login_data_callback: (postLoginDataRet: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>) => void) {

    const now: Date = new Date();
    const get_dept_config_url = "http://localhost:8080/post_login_info/" + username.toString();

    console.log("url = " + get_dept_config_url);

    const res = await fetch(get_dept_config_url);

    const deptConfigAPIResp = res.json();

    console.log("deptConfigAPIResp = " + deptConfigAPIResp);

    const deptConfigData = await Promise.all([deptConfigAPIResp]);
    console.log("deptConfigData = " + deptConfigData);

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
    console.log("ScheduleAnalyzerLogin.postLoginDataCallback");
    postLoginDataContext.setPostLoginData(postLoginDataRet);
    router.push('/schedule-analyzer');
  }

  if (!isLoading) {
    if (error) return <div>{error.message}</div>
    else if (!user) {
      router.push('/api/auth/login');
    }
    else if (user.email) {
      getPostLoginData(user.email, postLoginDataCallback);
    }
  }

  return <div>Loading ...</div>
}
