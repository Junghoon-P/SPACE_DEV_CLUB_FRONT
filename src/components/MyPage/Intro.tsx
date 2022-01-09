import styled from "@emotion/styled"
import Image from "next/image"
import HomeIcon from "@mui/icons-material/Home"
import GitHubIcon from "@mui/icons-material/GitHub"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import EmailIcon from "@mui/icons-material/Email"
import { PALLETS } from "../../constants"

export const Intro: React.FC = () => {
  return (
    <Introduce>
      <div className="introContainer">
        <a>
          <ProfileImg
            src="/image/sampleUser.jpg"
            alt="profile"
            width={128}
            height={128}
          />
        </a>
        <IntroContext>
          <span className="userName">minju</span>
          <p className="userDesc">PRE-FE에서 PRO-FE로🚀🪐!</p>
        </IntroContext>
      </div>
      <IntroSns>
        <Sns className="introGithub">
          <SnsLink>
            <GitHubIcon className="introIcons" />
          </SnsLink>
        </Sns>
        <Sns className="introTwitter">
          <SnsLink>
            <TwitterIcon className="introIcons" />
          </SnsLink>
        </Sns>
        <Sns className="introFacebook">
          <SnsLink>
            <FacebookIcon className="introIcons" />
          </SnsLink>
        </Sns>
        <Sns className="introHome">
          <SnsLink>
            <HomeIcon className="introIcons" />
          </SnsLink>
        </Sns>
        <Sns className="introEmail">
          <SnsLink href="mailto:deli-ght@naver.com">
            <EmailIcon className="introIcons" />
          </SnsLink>
          <EmailAddress>deli-ght@naver.com</EmailAddress>
        </Sns>
      </IntroSns>
    </Introduce>
  )
}

const Introduce = styled.article`
  margin-top: 90px;
  @media screen and (max-width: 768px) {
    padding: 16px;
    box-shadow: 0 10px 10px 0 #f2f2f2;
  }
  .introContainer {
    display: flex;
    align-items: center;
    height: 128px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(233, 236, 239);
    @media screen and (max-width: 768px) {
      flex-direction: column;
      height: 100%;
      align-items: start;
    }
  }

  .introIcons {
    color: ${PALLETS.SUB};
  }

  .introIcons:hover {
    color: ${PALLETS.MAIN};
  }
`

const SnsLink = styled.a`
  &:hover + * {
    display: inline;
  }
`

const IntroSns = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;
  li + li {
    margin-left: 16px;
  }
  .introEmail {
    display: flex;
    aling-items: center;
  }
`

const Sns = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  a {
    display: flex;
    align-items: center;
    height: 100%;
  }
`
const IntroContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px;
  .userName {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .userDesc {
    font-size: 18px;
  }
  @media screen and (max-width: 768px) {
    margin: 0;
  }
`

const ProfileImg = styled(Image)`
  border-radius: 50%;
`
const EmailAddress = styled.span`
  display: none;
  margin-left: 10px;
  padding: 3px;
  font-size: 12px;
  line-height: 1.5;
  background: ${PALLETS.MAIN};
  color: #fff;
  border-radius: 5px;
`