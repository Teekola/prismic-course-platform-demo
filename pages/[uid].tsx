// pages/[uid].js

import { createClient } from "../prismicio";

export default function Page({ page }: any) {
   return <h1>{page.uid}</h1>;
}

export async function getStaticProps({ params, previewData }: any) {
   const client = createClient({ previewData });

   const page = await client.getByUID("page", params.uid);

   return {
      props: { page },
   };
}
