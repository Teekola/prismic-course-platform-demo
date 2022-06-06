import { PropsWithChildren } from "react";
import styled from "styled-components";
const SH1 = styled.h1`
   color: #333;
   font-size: 3rem;
`;

const SP = styled.p`
   color: #256;
   font-size: 1rem;
`;

const H1 = ({ children }: PropsWithChildren<{}>) => <SH1>{children}</SH1>;
const P = ({ children }: PropsWithChildren<{}>) => <SP>{children}</SP>;

export { H1, P };
