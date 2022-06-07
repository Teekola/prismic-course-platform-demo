import { PropsWithChildren } from "react";
import Header from "./header";
import styled from "styled-components";

const StyledLayout = styled.div`
   max-width: 1500px;
   margin: 100px auto;
   padding: 0 1rem;
   display: grid;
   gap: 1rem;
`;

export default function Layout({ navbar, children }: PropsWithChildren<any>) {
   return (
      <StyledLayout>
         <Header navbar={navbar} />
         {children}
      </StyledLayout>
   );
}
