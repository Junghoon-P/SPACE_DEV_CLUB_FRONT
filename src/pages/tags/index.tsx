import styled from "@emotion/styled"
import { NextPage } from "next"
import { Header } from "../../components/Common/Header"
import { useContext, useState, useRef } from "react"
import { ThemeContext } from "../../pages/_app"
import { Theme } from "../../styles/theme"
import TagCards from "../../components/Tags/TagCards"
import { TAGS } from "../../data"
import Head from "next/head"
import { MEDIA_QUERY_END_POINT } from "../../constants"

const Tags: NextPage = () => {
  const sortedCount = useRef([...TAGS.sort((a, b) => b.tagCount - a.tagCount)])
  const sortedAlpha = useRef([
    ...TAGS.sort((a, b) => a.tagName.localeCompare(b.tagName)),
  ])
  const sortedTag = useRef(sortedCount.current)
  const { theme } = useContext(ThemeContext)
  const [isActive, setIsActive] = useState(false)
  // true - 이름순, false - 인기순
  const handleActive = (check: boolean) => {
    setIsActive(check)
    sortedTag.current = check ? sortedAlpha.current : sortedCount.current
  }

  return (
    <>
      <Head>
        <title>tags {isActive ? "(이름순)" : "(인기순)"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header user={false}></Header>
        <SortContainer>
          <Sorting theme={theme} active={isActive}>
            <SortBtn
              onClick={() => handleActive(false)}
              theme={theme}
              active={!isActive}
            >
              인기순
            </SortBtn>
            <SortBtn
              onClick={() => handleActive(true)}
              theme={theme}
              active={isActive}
            >
              이름순
            </SortBtn>
          </Sorting>
        </SortContainer>
        <TagsContainer>
          {sortedTag.current.map((e, i) => {
            return (
              <TagCards
                key={i}
                tagName={e.tagName}
                tagDesc={e.tagDescription}
                tagCount={e.tagCount}
              />
            )
          })}
        </TagsContainer>
      </section>
    </>
  )
}
export default Tags

const SortContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
`

type SortProps = {
  theme: Theme
  active: boolean
}

const Sorting = styled.div<SortProps>`
  display: inline-block;
  position: relative;
  &:after {
    content: "";
    width: 50%;
    height: 2px;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: ${({ active }) =>
      active ? "translateX(0)" : "translateX(-100%)"};
    background-color: ${({ theme }) => theme.MAIN};
    transition: 0.3s ease-in;
  }
`

const SortBtn = styled.button<SortProps>`
  width: 128px;
  height: 48px;
  font-size: 18px;
  color: ${({ active, theme }) => (active ? theme.MAIN : theme.MAIN_FONT)};
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    font-size: 16px;
  }
`

const TagsContainer = styled.article`
  display: grid;
  margin : 64px auto 0;
  width : 100%
  grid-template-columns: repeat(1, 1fr);
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.SMALL}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
    width: 1024px;
  }

  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.DESKTOP}) {
    grid-template-columns: repeat(4, 1fr);
    width: 1200px;
  }
`
