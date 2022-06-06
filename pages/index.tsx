import { createClient } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";

import Head from "next/head";

export default function Homepage({ slices, seoTitle, seoDescription }: any) {
   return (
      <>
         <Head>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
         </Head>
         <SliceZone slices={slices} components={components} />
      </>
   );
}

export async function getStaticProps({ previewData }: any) {
   const client = createClient({ previewData });

   const document = await client.getSingle("homepage");

   return {
      props: {
         slices: document.data.slices,
         seoTitle: document.data.metaTitle,
         seoDescription: document.data.metaDescription,
      },
   };
}
