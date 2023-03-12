import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import {
    FooterContainer,
    FooterWrap,
    SocialMediaWrap,
    SocialLogo,
    SocialIcons,
    SocialIconLink,
    SocialMedia,

} from "./FooterElements";

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to="/">Dante</SocialLogo>
                    <SocialIcons>
                        <SocialIconLink
                            href="https://github.com/soydanteprz"
                            target="_blank"
                            aria-label="Github"
                        >
                            <FaGithub />
                        </SocialIconLink>
                        <SocialIconLink
                            href="https://www.instagram.com/soydanteprz/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </SocialIconLink>
                        <SocialIconLink
                            href="https://www.linkedin.com/in/danteperez/"
                            target="_blank"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </SocialIconLink>
                    </SocialIcons>
                </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    );
};

export default Footer;
