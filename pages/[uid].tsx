import { createClient, linkResolver } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";
import * as prismicH from "@prismicio/helpers";

import Head from "next/head";
import NotFound from "./404";

const defaultTitle = "Prismic Demo";
const defaultDesc = "Prismic Demo on projekti Prismic.io:ntestailua varten.";

export default function Page({ slices, seoTitle, seoDescription }: any) {
   if (slices && seoTitle && seoDescription)
      return (
         <>
            <Head>
               <title>{seoTitle}</title>
               <meta name="description" content={seoDescription} />
            </Head>
            <SliceZone slices={slices} components={components} />
         </>
      );
   else {
      return <NotFound />;
   }
}

export async function getStaticPaths() {
   const client = createClient();
   const documents = await client.getAllByType("page");
   return {
      paths: documents.map((doc) => prismicH.asLink(doc, linkResolver)),
      fallback: true,
   };
}

export async function getStaticProps({ params, previewData }: any) {
   const client = createClient({ previewData });

   try {
      const page = await client.getByUID("page", params.uid);
      return {
         props: {
            slices: page.data.slices,
            seoTitle: page.data.seoTitle ? page.data.seoTitle : defaultTitle,
            seoDescription: page.data.seoDescription
               ? page.data.seoTitle
               : defaultDesc,
         },
      };
   } catch (error) {
      console.log(error);
      return { props: {} };
   }
}
