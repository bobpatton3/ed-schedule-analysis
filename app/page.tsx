"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { DepartmentConfigurationType, PostLoginDataContext } from "@/context/postLoginDataContext";
import { useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();

  const router = useRouter();
  const postLoginDataContext = useContext(PostLoginDataContext);

  async function getPostLoginData(username: string, post_login_data_callback: (postLoginDataRet: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>) => void) {
    console.log("Home.postLoginData");
    const now: Date = new Date();

    const res = await fetch('api/forwardToServer?serverapi=post_login_info&params=/' + user?.email, { method: 'GET', });

    const deptConfigAPIResp = res.json();

    console.log("deptConfigAPIResp = " + deptConfigAPIResp);

    const deptConfigData = await Promise.all([deptConfigAPIResp]);
    console.log("deptConfigData = " + deptConfigData);

    const deptConfigurations: Map<string, Map<string, Map<string, DepartmentConfigurationType>>> =
      new Map<string, Map<string, Map<string, DepartmentConfigurationType>>>();

    deptConfigData[0].forEach((r: any) => {
      console.log("r = " + r);
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
          data_start_date: new Date(r.data_start_date * 1000),
          data_end_date: new Date(r.data_end_date * 1000),
          phys_hourly_cost: r.phys_hourly_cost,
          phys_peak_capacity: r.phys_peak_capacity,
          app_hourly_cost: r.app_hourly_cost,
          app_peak_capacity: r.app_peak_capacity,
        };
        deptConfigurations.get(r.client_group_name)?.get(r.facility_name)?.set(r.department_name, dpetConfig);
        console.log("r.data_start_date = " + r.data_start_date);
        const st: Date = new Date(r.data_start_date * 1000);
        console.log("st = " + st);
        console.log("dpetConfig.data_start_date = " + dpetConfig.data_start_date);
      }
    });

    post_login_data_callback(deptConfigurations);

  };

  function postLoginDataCallback(postLoginDataRet: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>) {
    console.log("Home.postLoginDataCallback");
    postLoginDataContext.setPostLoginData(postLoginDataRet);
  }

  function onClickLoadDataButton() {
    console.log("Home.onClickLoadDataButton");
    if (user && user.email) {
      getPostLoginData(user.email, postLoginDataCallback);
    }
  }

  function onClickScheduleAnalyzerButton() {
    console.log("Home.onClickScheduleAnalyzerButton");
    router.push('/schedule-analyzer');
  }

  function onClickLoginButton() {
    console.log("onClickLoginButton");
    if (user && user.email) {
      console.log("onClickLoginButton with valid user and email so do nothing");
    } else {
      console.log("login");
      router.push('/api/auth/login');
    }
  };

  function onClickLogoutButton() {
    console.log("onClickLogoutButton ");
    router.push('/api/auth/logout');
  };
  /*
    if (!isLoading) {
      if (error) return <div>{error.message}</div>
      else if (!user) {
        router.push('/api/auth/login');
      }
      else if (user.email) {
        getPostLoginData(user.email, postLoginDataCallback);
      }
    }

    
  */

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
        <Button variant="outline-primary" onClick={onClickLoginButton} className="setMonthsButtons">Login</Button><br />
        <Button variant="outline-primary" onClick={onClickLoadDataButton} className="setMonthsButtons">Load Data</Button><br />
        <Button variant="outline-primary" onClick={onClickScheduleAnalyzerButton} className="setMonthsButtons">Schedule Analyzer</Button><br />
        <Button variant="outline-primary" onClick={onClickLogoutButton} className="setMonthsButtons">Logout</Button><br />
      </div>
    </main>
  );

}
