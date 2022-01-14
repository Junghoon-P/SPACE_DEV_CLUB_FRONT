import styled from "@emotion/styled";
import { PostCard } from "../Home/Card";
import { MEDIA_QUERY_END_POINT } from "../../constants";
export const DetailCard = () => {
  return (
    <div>
      <CardTitle>관심 있을 만한 포스트</CardTitle>
      <Container>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
        <PostCard></PostCard>
      </Container>
    </div>
  );
};

const CardTitle = styled.h3`
  text-align: center;
  margin: 70px 0;
  font-size: 32px;
  font-weight: 500;
`;
const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  margin: 0 20px;
  @media (min-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    margin: 0 20px;
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    max-width: ${MEDIA_QUERY_END_POINT.TABLET};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.LARGE}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    max-width: ${MEDIA_QUERY_END_POINT.LARGE};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.XLARGE}) {
    grid-template-columns: repeat(5, 1fr);
    gap: 32px;
    max-width: 1728px;
  }
`;
