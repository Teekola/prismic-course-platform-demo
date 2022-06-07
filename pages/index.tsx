import { createClient } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";

import Head from "next/head";
import Layout from "components/layout";

export default function Homepage({
   slices,
   navbar,
   seoTitle,
   seoDescription,
}: any) {
   return (
      <Layout navbar={navbar}>
         <Head>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
         </Head>
         <SliceZone slices={slices} components={components} />
      </Layout>
   );
}

export async function getStaticProps({ previewData }: any) {
   const client = createClient({ previewData });

   const document = await client.getSingle("homepage");
   const navbar = await client.getSingle("navbar");

   return {
      props: {
         slices: document.data.slices,
         navbar,
         seoTitle: document.data.metaTitle,
         seoDescription: document.data.metaDescription,
      },
   };
}
