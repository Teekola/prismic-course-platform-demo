import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/globalStyle";
import themeDefault from "styles/themes/themeDefault";

export default function MyApp({ Component, pageProps }: AppProps) {
   return (
      <>
         <GlobalStyle />
         <ThemeProvider theme={themeDefault}>
            <Component {...pageProps} />
         </ThemeProvider>
      </>
   );
}
