import styled from "styled-components";
import { PrismicLink } from "@prismicio/react";
import Image from "next/image";

const StyledCourseCard = styled.div`
   display: flex;
   gap: 2rem;
   border-radius: 1rem;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
   max-width: 960px;

   .img-container {
      margin: 1rem;
      position: relative;
      min-width: 150px;
      min-height: 150px;
   }

   .info {
      padding: 1rem;
   }
`;

type CourseCardProps = {
   nimi: string;
   uid: string;
   hinta: string;
   kuva: any;
   lyhytKuvaus: string;
};

export default function CourseCard({
   nimi,
   uid,
   hinta,
   kuva,
   lyhytKuvaus,
}: CourseCardProps) {
   return (
      <PrismicLink
         href={`/kurssit/${uid}`}
         style={{ textDecoration: "none", color: "inherit" }}
      >
         <StyledCourseCard>
            <div className="img-container">
               <Image
                  src={kuva.url}
                  alt={kuva.alt}
                  layout="fill"
                  objectFit="contain"
                  draggable="false"
               />
            </div>

            <div className="info">
               <h3>{nimi}</h3>
               <p>{lyhytKuvaus}</p>
            </div>
         </StyledCourseCard>
      </PrismicLink>
   );
}
