"use client";

import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { DepartmentConfigurationType, PostLoginDataContext } from "@/context/postLoginDataContext";
import { useContext, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

/* Things to do:
    - Docker - containerize!
    - Add more Cypress tests?
    - add page that says Server Down! and go there when deptConfigData[0].length === 0  - an "else" on line 62
    - remove Bootstrap. Found it was unnecessary on another proj and caused quite some bloat. See how much I am currently using it - do a test branch and uninstall it
    - allow the door-to-provider interval to be configurable by the user
    - allow the doc and PA sculptings to be configurable by the user
*/

export default function Home() {
  const { user, isLoading } = useUser();
  const [loadingData, setLoadingData] = useState(false);

  const router = useRouter();
  const postLoginDataContext = useContext(PostLoginDataContext);

  async function getPostLoginData(username: string, post_login_data_callback: (postLoginDataRet: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>) => void) {
    console.log("Home.postLoginData");

    const res = await fetch('api/forwardToServer?serverapi=post_login_info&params=/' + user?.email, { method: 'GET', });

    const deptConfigAPIResp = res.json();

    const deptConfigData = await Promise.all([deptConfigAPIResp]);

    const deptConfigurations: Map<string, Map<string, Map<string, DepartmentConfigurationType>>> =
      new Map<string, Map<string, Map<string, DepartmentConfigurationType>>>();

    if (deptConfigData[0].length > 0) {
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
    }

    post_login_data_callback(deptConfigurations);

  };

  function postLoginDataCallback(postLoginDataRet: Map<string, Map<string, Map<string, DepartmentConfigurationType>>>) {
    console.log("Home.postLoginDataCallback");
    postLoginDataContext.setPostLoginData(postLoginDataRet);
    router.push('/schedule-analyzer');
  }

  function onClickLoadDataButton() {
    setLoadingData(true);
    if (user?.email) {
      getPostLoginData(user.email, postLoginDataCallback);
    }
  }

  return (
    <main >
      <div className="logincenter">
        {(isLoading || loadingData) ? <div>...LOADING!</div> :
          (!user) ?
            <a className="btn btn-primary setMonthsButtons" href="/api/auth/login">Login</a> :
            <div>
              <Button variant="primary" onClick={onClickLoadDataButton} className="setMonthsButtons">Load Data</Button><br />
              <a className="btn btn-primary setMonthsButtons" href="/api/auth/logout">Logout</a>
            </div>
        }
        <br />
      </div>
    </main>
  );

}
