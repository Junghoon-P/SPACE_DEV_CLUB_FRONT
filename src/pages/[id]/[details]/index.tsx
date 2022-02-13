import { NextPage } from "next";
import styled from "@emotion/styled";
import Head from "next/head";

import { DetailHeader } from "../../../components/Details/DetailHeader";
import { LeftHeader } from "../../../components/Details/LeftHeader";
import { RightHeader } from "../../../components/Details/RightHeader";

// import { CardContainer } from "../../../components/Home/CardContainer";
import { Header } from "../../../components/Common/Header";

import { Theme } from "../../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../_app";
import { useRouter } from "next/router";
import { useData } from "../../../hooks/useData";
import { ErrorPage } from "../../../components/Common/ErrorPage";
import { userInfo } from "../../../types/Main";

interface ThemeProps {
  theme: Theme;
}

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: number;
  attributes: {
    title: string;
    contents: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    url: string;
    private: null;

    userid: {
      data: {
        id: number;
        attributes: userInfo;
      };
    };

    likeposts: {
      data: [];
    };

    comments: {
      data: [];
    };
    hashtags: {
      data: [];
    };
  };
}

interface ReadingPost {
  id: number;
  attributes: {
    postid: {
      data: {
        id: number;
      };
    };
  };
}

const DetailsIndexPage: NextPage = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const userName = router.query.id;
  const userDetails = router.query.details;

  const { data: DetailData, error: DetailError } = useData(
    "posts",
    "populate=*"
  );

  if (!DetailData) return <div>로딩중</div>;
  if (DetailError) return <div>에러</div>;

  let postid = 0;

  let postObj = {
    title: "",
    contents: "",
    url: "",
    likeposts: {
      data: [],
    },
    comments: {
      data: [],
    },
    createdAt: "",
    hashtags: {
      data: [],
    },
  };

  let user: userInfo = {
    email: "",
    userid: "",
    profile: "",
    profileimage: "",
    facebook: "",
    home: "",
    twitter: "",
    github: "",
    velogtitle: "",
    profilename: "",
    aboutme: "",
    snsemail: "",
  };

  DetailData.data.some((details: Post) => {
    if (
      userDetails === details.attributes.url &&
      userName === details.attributes.userid.data.attributes.userid
    ) {
      postid = details.id;
      postObj = details.attributes;
      user = details.attributes.userid.data.attributes;
      return true;
    }
  });

  return (
    <main>
      <Head>
        <title>Space Dev Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {postObj.title ? (
        <div>
          <Header username={"deli-ght"} user={true} />
          <DetailContainer>
            <LeftHeader likepost={postObj.likeposts.data} />
            <DetailHeader
              title={postObj.title}
              contents={postObj.contents}
              userName={userName}
              comments={postObj.comments.data}
              postid={postid}
              createdAt={postObj.createdAt}
              userdata={user}
              hashtags={postObj.hashtags.data}
            />
            <RightHeader />
          </DetailContainer>
          <PostsContainer theme={theme}>
            {/* <CardContainer filter="zz" /> */}
          </PostsContainer>
        </div>
      ) : (
        <ErrorPage />
      )}
    </main>
  );
};

export default DetailsIndexPage;

const DetailContainer = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const PostsContainer = styled.div<ThemeProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.BACKGROUND};
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 32px;
  margin-top: 50px;
`;
