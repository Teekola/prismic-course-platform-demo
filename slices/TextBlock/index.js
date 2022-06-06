import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import styled from 'styled-components';

const StyledP = styled.p`
   font-weight: bold;
`

const TextBlockSpecificDescription = ({ children }) => (
   <StyledP>{children}</StyledP>
)

export default function TextBlock({ slice }) {
   return (
      <>
         <PrismicRichText field={slice.primary.title} />
         <PrismicRichText field={slice.primary.description} components={{
            paragraph: ({ children }) => <TextBlockSpecificDescription>{children}</TextBlockSpecificDescription>
         }} />
         {
            slice.items?.map((item, i) =>
               <PrismicRichText key={i} field={item.paragraph} />
            )
         }

      </>
   )
}