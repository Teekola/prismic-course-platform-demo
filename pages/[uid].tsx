// pages/[uid].js

import { createClient } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";

export default function Page({ page }: any) {
   return (
      <>
         <SliceZone slices={page.data.slices} components={components} />
      </>
   );
}

export async function getStaticProps({ params, previewData }: any) {
   const client = createClient({ previewData });

   const page = await client.getByUID("page", params.uid);

   return {
      props: { page },
   };
}

export async function getStaticPaths() {
   return {
      paths: [{ params: { uid: "page1" } }, { params: { uid: "page2" } }],
      fallback: false,
   };
}
