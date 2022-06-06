// pages/[uid].js

import { createClient, linkResolver } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";
import * as prismicH from "@prismicio/helpers";

import NotFound from "./404";

export default function Page({ page }: any) {
   if (page)
      return <SliceZone slices={page.data.slices} components={components} />;
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
         props: { page },
      };
   } catch (error) {
      console.log(error);
      return { props: {} };
   }
}
