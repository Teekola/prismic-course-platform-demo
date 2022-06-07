import { createClient } from "../../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";

import { useRouter } from "next/router";
import Layout from "components/layout";
import NotFound from "../404";

export default function CoursesPage({ slices, navbar }: any) {
   const router = useRouter();

   if (router.isFallback) {
      return <h1>Ladataan sivua...</h1>;
   }

   if (!slices) {
      return <NotFound navbar={navbar} />;
   }

   return (
      <Layout navbar={navbar}>
         <SliceZone slices={slices} components={components} />
      </Layout>
   );
}

export async function getStaticProps({ previewData }: any) {
   const client = createClient({ previewData });
   const navbar = await client.getSingle("navbar");

   try {
      const page = await client.getByUID("coursesPage", "omat_kurssit");
      return {
         props: {
            slices: page.data.slices,
            navbar,
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
