import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileCard from "../../components/ProfileCard";
import { type ProfileDetailResponse } from "../../types/mypage&profile.types";
import axiosInstance from "../../../axiosInstance";


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--gray-text-filled);
  padding: 3rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const PageTitle = styled.h1`
  margin-bottom: 2.5rem;
`;

const MessageSection = styled.div`
  width: 100%;
  background-color: var(--white);
  border: 1px solid var(--gray);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const MessageTitle = styled.div`
  color: var(--black);
  margin-bottom: 1rem;
`;

const MessageTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--gray);
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: 'Escoredream', sans-serif;
  font-weight: 300;
  min-height: 8rem;
  resize: vertical;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--skyblue);
  }
  
  &::placeholder {
    color: var(--gray-400);
  }
`;

const MessageButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--skyblue);
  color: var(--white);
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background-color: var(--primary);
  }
`;

const ProfileDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<ProfileDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfileDetail = async () => {
      try {
        if (!userId) {
          console.warn("userId가 없습니다. useParams() 확인 필요.");
          return;
        }
  
        console.log(`프로필 상세 요청 시작: /api/profiles/${userId}`);
  
        const res = await axiosInstance.get(`/api/profiles/${userId}`);
        const data = res.data;
        console.log("프로필 불러오기 성공:", data);
  
        // ✅ BASE_URL 정의 (여기서 불러옴)
        const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
        // ✅ 슬래시 중복 자동 제거
        const cleanBaseUrl = BASE_URL.endsWith("/")
          ? BASE_URL.slice(0, -1)
          : BASE_URL;
  
        // ✅ /uploads로 시작하는 경로만 서버 URL 붙이기
        const profileImageUrl =
          data.profileImage && data.profileImage.startsWith("/uploads")
            ? `${cleanBaseUrl}${data.profileImage}`
            : data.profileImage;
  
        // ✅ 데이터 변환
        const formattedData: ProfileDetailResponse = {
          userId: data.userId,
          nickname: data.nickname,
          campus: data.campus,
          country: data.country,
          mbti: data.mbti,
          profileImage: profileImageUrl, // 여기서 교체된 이미지 URL 사용
          introTitle: data.infoTitle,
          introContent: data.infoContent,
          keywords: data.keywords.map((k: any) => k.name),
          languages: {
            native: data.nativeLanguages.map((l: any) => l.name),
            learn: data.learnLanguages.map((l: any) => l.name),
          },
        };
  
        setUserData(formattedData);
      } catch (error) {
        console.error("프로필 상세 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileDetail();
  }, [userId]);
  
  

  const handleSendMessage = () => {
    console.log("메시지 전송:", message);
    //😭메시지 전송 API 호출
    alert("메시지가 전송되었습니다!");
    setMessage("");
  };

  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <div className="Body1">로딩 중...</div>
        </ContentWrapper>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <ContentWrapper>
          <div className="Body1">프로필 정보를 불러올 수 없습니다.</div>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className="H1">프로필 조회</PageTitle>
        
        <ProfileCard
          userId={userData.userId}
          nickname={userData.nickname}
          mbti={userData.mbti}
          country={userData.country}
          profileImage={userData.profileImage}
          infoTitle={userData.introTitle}
          infoContent={userData.introContent}
          keywords={userData.keywords}
          campus={userData.campus}
          nativeLanguages={userData.languages.native}
          learnLanguages={userData.languages.learn}
          isOwner={false}
        />
        

        {/* 메시지 보내기 */}
        <MessageSection>
          <MessageTitle className="H4">문의 작성하기</MessageTitle>
          <MessageTextarea
            className="Body1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="문의할 내용을 작성해주세요"
          />
          <MessageButton 
            className="Button1"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            문의하기
          </MessageButton>
        </MessageSection>
      </ContentWrapper>
    </Container>
  );
};

export default ProfileDetail;