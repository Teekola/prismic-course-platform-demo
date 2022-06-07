import { useEffect, useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import styled from "styled-components";
import CourseCard from "components/courseCard";

const StyledKurssit = styled.div`
   display: grid;
   gap: 1rem;
`;
type CourseCardProps = {
   nimi: string;
   uid: string;
   hinta: string;
   kuva: Object;
   lyhytKuvaus: string;
   slices: Array<Object>;
};
export default function Kurssit({ slice }: any) {
   const [courseData, setCourseData] = useState<Array<CourseCardProps>>([]);

   useEffect(() => {
      const fetchAndSetData = async () => {
         const courses = await fetch("/api/getCourses");
         const courses_json = await courses.json();
         setCourseData(courses_json.courses);
      };
      fetchAndSetData();
   }, [setCourseData]);

   return (
      <StyledKurssit>
         <PrismicRichText field={slice?.primary.otsikko} />
         <PrismicRichText field={slice?.primary.kuvaus} />

         {courseData?.map((course: any, i: Number) => (
            <CourseCard
               key={course.data.id + i}
               nimi={course.data.nimi}
               uid={course.uid}
               hinta={course.data.hinta}
               kuva={course.data.kuva}
               lyhytKuvaus={course.data.lyhytKuvaus}
            />
         ))}
      </StyledKurssit>
   );
}
