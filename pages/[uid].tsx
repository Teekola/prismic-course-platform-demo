import { createClient, linkResolver } from "../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../slices";
import * as prismicH from "@prismicio/helpers";

import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "components/layout";
import NotFound from "./404";

const defaultTitle = "Prismic Demo";
const defaultDesc = "Prismic Demo on projekti Prismic.io:ntestailua varten.";

export default function Page({
   slices,
   navbar,
   seoTitle,
   seoDescription,
}: any) {
   const router = useRouter();

   if (router.isFallback) {
      return <h1>Ladataan sivua...</h1>;
   }

   if (!slices) {
      return <NotFound navbar={navbar} />;
   }

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

export async function getStaticPaths() {
   const client = createClient();
   const documents = await client.getAllByType("page");
   return {
      paths: documents.map((doc: any) => prismicH.asLink(doc, linkResolver)),
      fallback: true,
   };
}

export async function getStaticProps({ params, previewData }: any) {
   const client = createClient({ previewData });
   const navbar = await client.getSingle("navbar");

   try {
      const page = await client.getByUID("page", params.uid);
      return {
         props: {
            slices: page.data.slices,
            navbar,
            seoTitle: page.data.seoTitle ? page.data.seoTitle : defaultTitle,
            seoDescription: page.data.seoDescription
               ? page.data.seoTitle
               : defaultDesc,
         },
      };
   } catch (error) {
      return {
         props: {
            navbar,
         },
      };
   }
}
