import { UUID } from "crypto";
import { Dispatch, SetStateAction } from "react";

export type DepartmentConfigurationType = {
    department_id: UUID,
    department_name: string,
    data_start_date: Date,
    data_end_date: Date,
    phys_hourly_cost: number,
    phys_peak_capacity: number,
    app_hourly_cost: number,
    app_peak_capacity: number,
};

export default class PostLoginData {

    public static async getPostLoginData(user_id: UUID, post_login_data_callback: Dispatch<SetStateAction<Map<string, Map<string, Map<string, DepartmentConfigurationType>>>>>) {

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

    }
}
