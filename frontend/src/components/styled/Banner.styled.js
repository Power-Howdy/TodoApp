import styled from "styled-components";

export const StyledBanner = styled.div`
        position: absolute;
        z-index: -1;
        left: 0;
        top: 0;
        height: 15rem;
        width: 100vw;
        background: url(${({theme}) => theme.bannerDesktop});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

    @media (min-width: 1440px) {
            height: 19rem;
    }
`