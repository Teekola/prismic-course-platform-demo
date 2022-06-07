import { PrismicLink, PrismicText } from "@prismicio/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";

const StyledHeader = styled.header`
   position: fixed;
   left: 0;
   top: 0;
   transition: all 150ms ease;
   width: 100%;
   background: steelblue;
   z-index: 1;

   .container {
      max-width: 1500px;
      margin: 0 auto;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   .logo-container {
      position: relative;
      width: 60px;
      height: 60px;
   }

   .logo-container:hover {
      filter: brightness(150%);
   }
   .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
   }

   .navlink > a {
      color: white;
      text-decoration: none;
   }

   .active > a {
      color: black;
      font-weight: bold;
   }
`;

export default function Header({ navbar }: any) {
   const [showHeader, setShowHeader] = useState(true);
   const [showBurger, setShowBurger] = useState(true);
   const barRef = useRef<any>();
   const [prevScrollPos, setPrevScrollPos] = useState(0);
   const router = useRouter();

   const handleMouseMove = useDebouncedCallback((e) => {
      const currentY = e.clientY;
      if (currentY < 60) {
         setShowHeader(true);
      }
   }, 100);

   const handleScroll = useDebouncedCallback(() => {
      // Nykyinen scroll sijainti
      const currentScrollPos = window.pageYOffset;

      const minScrollAmount = 70;
      const alwaysShowAtYLessThan = 60;

      // Vaihda state sijainnin perusteella
      setShowHeader(
         (prevScrollPos > currentScrollPos &&
            prevScrollPos - currentScrollPos > minScrollAmount) ||
            currentScrollPos < alwaysShowAtYLessThan
      );

      // Aseta edellisen skrollaussijainnin arvoksi nykyinen
      setPrevScrollPos(currentScrollPos);
   }, 100);

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
         window.removeEventListener("scroll", handleScroll);
         window.removeEventListener("mousemove", handleMouseMove);
      };
   }, [prevScrollPos, showHeader, handleScroll, handleMouseMove]);

   return (
      <StyledHeader
         style={
            showHeader
               ? {
                    top: 0,
                    filter: "blur(0)",
                 }
               : { top: -100, filter: "blur(5px)" }
         }
         ref={barRef}
      >
         <div className="container">
            <PrismicLink href="/">
               <div className="logo-container">
                  <Image
                     src={navbar.data.logo.url}
                     alt={navbar.data.logo.alt}
                     layout="fill"
                     draggable="false"
                  />
               </div>
            </PrismicLink>
            <nav className="nav-container">
               <ul className="nav-links">
                  {navbar.data?.navlinks.map((navlink: any, i: Number) => (
                     <li
                        key={navlink.label + i}
                        className={
                           router.asPath === "/" + navlink.navlink.uid
                              ? "navlink active"
                              : "navlink"
                        }
                     >
                        <PrismicLink field={navlink.navlink}>
                           <PrismicText field={navlink.label} />
                        </PrismicLink>
                     </li>
                  ))}
               </ul>
            </nav>
         </div>
      </StyledHeader>
   );
}
