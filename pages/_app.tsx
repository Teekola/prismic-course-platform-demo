import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/globalStyle";
import themeDefault from "styles/themes/themeDefault";

import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { linkResolver, repositoryName } from "../prismicio";

export default function MyApp({ Component, pageProps }: AppProps) {
   return (
      <PrismicProvider
         linkResolver={linkResolver}
         internalLinkComponent={({ href, children, ...props }) => (
            <Link href={href}>
               <a {...props}>{children}</a>
            </Link>
         )}
      >
         <PrismicPreview repositoryName={repositoryName}>
            <GlobalStyle />
            <ThemeProvider theme={themeDefault}>
               <Component {...pageProps} />
            </ThemeProvider>
         </PrismicPreview>
      </PrismicProvider>
   );
}
