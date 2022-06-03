// pages/[uid].js

import { createClient } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";

export default function Homepage({ document }: any) {
   return (
      <>
         <SliceZone slices={document.data.slices} components={components} />
      </>
   );
}

export async function getStaticProps({ previewData }: any) {
   const client = createClient({ previewData });

   const document = await client.getSingle("homepage");

   return {
      props: { document },
   };
}
