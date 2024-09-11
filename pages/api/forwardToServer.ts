// import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

// export default withApiAuthRequired(async (req, res) => {
export default async function forwardToServer (req: NextApiRequest, res: NextApiResponse<any>) {

    try {
        // If our access token is expired and we have a refresh token
        // `getAccessToken` will fetch a new one using the `refresh_token` grant

        const { serverapi, params } = req.query;

        const get_dept_config_url = `http://localhost:8080/${serverapi}${params}`;

        // const { accessToken } = await getAccessToken(req, res);

        let options: RequestInit = {
            method: req.method,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${accessToken}`
            },
        };

        if (req.body) options = {
            method: req.method,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${accessToken}`
            },
            body: req.body
        };

        const response = await fetch(get_dept_config_url, options);

        const jsn = (req.method === 'DELETE') ? "" : (req.method === 'POST') ? await response.text() : await response.json();

        res.status(response.status || 200).json(jsn);

    } catch (error: any) {
        console.log("exception!");
        console.error(error);
        res.status(error.status || 500).json({
            code: error.code,
            error: error.message
        });
    }
}
// });


