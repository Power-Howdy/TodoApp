import styled from "styled-components";

export const StyledHeader = styled.header`
    height: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        color: #FFF;
        padding-top: .5rem;
        letter-spacing: 10px;
        font-weight: 700;
    }
    
    .disconnect {
        position: absolute;
        right: 30px;
        top: 30px;
        color: #FFF;
        cursor: pointer;
        font-size: 20px;
    }

    .toggle-icon {
        background: none;
        border: none;
    }
    
    
    @media (min-width: 1440px) {
        margin-top: 1rem;
    }
`