import styled from "@emotion/styled"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import qs from "qs"
import { useContext } from "react"
import { Header } from "@components/Common/Header"
import ContentData from "@components/Common/ContentData"
import TagLoading from "@components/Tags/TagLoading"
import { MEDIA_QUERY_END_POINT } from "@src/constants"
import { useData } from "@hooks/useData"
import { ThemeProps } from "@src/types/Theme"
import { ThemeContext } from "../_app"

const SearchTag = () => {
  const router = useRouter()
  const tagname = router.query.tagname
  const { theme } = useContext(ThemeContext)

  const query = qs.stringify(
    {
      populate: {
        posts: {
          populate: ["hashtags", "userid"],
        },
      },
      filters: {
        name: {
          $eq: tagname,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )
  const { data, error } = useData("hashtags", query)

  return (
    <>
      <Head>
        <title>#{tagname}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data ? (
        <TagSection>
          <Header user={false} />
          <Main>
            <TagInfo>
              <TagImg>
                <Image
                  src="/image/sample.jpeg"
                  alt="thumbnail"
                  width={192}
                  height={192}
                  className="thumbnail"
                />
              </TagImg>
              <TagName># {tagname}</TagName>
              <TagDesc theme={theme}>
                {data.data[0].attributes.description}
              </TagDesc>
              <TagCount theme={theme}>
                총 {data.data[0].attributes.posts.data.length}
                개의 포스트
              </TagCount>
            </TagInfo>
            <CardContainer>
              <ContentData tag={data.data[0].attributes.name} />
            </CardContainer>
          </Main>
        </TagSection>
      ) : (
        <TagLoading />
      )}
    </>
  )
}

export default SearchTag

const TagSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Main = styled.main`
  width: 768px;

  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
  }
`

const TagInfo = styled.article`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 64px;
`
const TagImg = styled.div`
  border-radius: 50%;
  width: 192px;
  height: 192px;
  overflow: hidden;
  margin-bottom: 32px;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    width: 128px;
    height: 128px;
    margin: 32px 0 16px;
  }
`
const TagName = styled.h1`
  font-size: 48px;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    font-size: 32px;
  }
`

const TagDesc = styled.p<ThemeProps>`
  margin: 16px 0;
  font-size: 18px;
  line-height: 1.5;
  line-break: anywhere;
  color: ${({ theme }) => theme.MAIN_FONT};
`

const TagCount = styled.p<ThemeProps>`
  color: ${({ theme }) => theme.POINT_FONT};
`

const CardContainer = styled.article``
