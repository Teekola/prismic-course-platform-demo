import { createClient, linkResolver } from "../../prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "../../slices";
import * as prismicH from "@prismicio/helpers";

import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "components/layout";
import NotFound from "../404";

const StyledVideoContainer = styled.div`
   width: 50%;
   .video {
      position: relative;
      padding-top: 25px;
      padding-bottom: 56.25%; /* 16:9 */
   }

   iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
   }
`;

export default function Page({ slices, navbar, video }: any) {
   const router = useRouter();

   if (router.isFallback) {
      return <h1>Ladataan sivua...</h1>;
   }

   if (!slices) {
      return <NotFound navbar={navbar} />;
   }

   return (
      <Layout navbar={navbar}>
         <StyledVideoContainer>
            <div
               className="video"
               dangerouslySetInnerHTML={{ __html: video.html }}
            />
         </StyledVideoContainer>
         <SliceZone slices={slices} components={components} />
      </Layout>
   );
}

export async function getStaticPaths() {
   const client = createClient();
   const courses = await client.getAllByType("kurssi");
   return {
      paths: courses.map((course: any) =>
         prismicH.asLink(course, linkResolver)
      ),
      fallback: true,
   };
}

export async function getStaticProps({ params, previewData }: any) {
   const client = createClient({ previewData });
   const navbar = await client.getSingle("navbar");

   try {
      const kurssi = await client.getByUID("kurssi", params.uid);

      return {
         props: {
            slices: kurssi.data.slices,
            navbar,
            video: kurssi.data.video,
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
