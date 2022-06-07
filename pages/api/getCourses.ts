// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../../prismicio";

type Courses = {
   courses: Object;
};

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Courses>
) {
   const client = createClient();
   const courses = await client.getAllByType("kurssiTuote");

   res.status(200).json({ courses });
}
