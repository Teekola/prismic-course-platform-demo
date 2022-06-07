import { createClient } from "../prismicio";
import Layout from "components/layout";
import { PropsWithChildren } from "react";

export default function NotFound({ navbar }: PropsWithChildren<any>) {
   return (
      <Layout navbar={navbar}>
         <h1>Virhe 404. Tätä sivua ei ole olemassa.</h1>
      </Layout>
   );
}

export async function getStaticProps({ previewData }: any) {
   const client = createClient({ previewData });
   const navbar = await client.getSingle("navbar");

   return {
      props: {
         navbar,
      },
   };
}
