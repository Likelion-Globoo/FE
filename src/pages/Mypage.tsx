import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileCard from "../components/ProfileCard";
import ActivityTabs from "../components/ActivityTabs";
import axiosInstance from "../../axiosInstance";
import { type UserMeResponse, type Post } from "../types/mypage&profile.types";

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

const Mypage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [languages, setLanguages] = useState<{ nativeCodes: string[]; learnCodes: string[] }>({
    nativeCodes: [],
    learnCodes: []
  });
  const [keywords, setKeywords] = useState<{ personality: string[]; hobby: string[]; topic: string[] }>({
    personality: [],
    hobby: [],
    topic: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");

  // 언어 코드 → 한글 매핑 객체
  const LANGUAGE_MAP: Record<string, string> = {
    ko: "한국어",
    en: "영어",
    es: "스페인어",
    fr: "프랑스어",
    ja: "일본어",
    zh: "중국어",
    de: "독일어",
    it: "이탈리아어",
  };

  const LANGUAGE_REVERSE_MAP: Record<string, string> = {
    한국어: "ko",
    영어: "en",
    스페인어: "es",
    프랑스어: "fr",
    일본어: "ja",
    중국어: "zh",
    독일어: "de",
    이탈리아어: "it",
  };

  // 내 정보 + 언어 + 키워드 조회
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await axiosInstance.get("/api/users/me");
        const user = userRes.data;
  
        setUserData(user);
        setLanguages({
          nativeCodes: user.nativeLanguages || [],
          learnCodes: user.learnLanguages || [],
        });
        setKeywords({
          personality: user.personalityKeywords || [],
          hobby: user.hobbyKeywords || [],
          topic: user.topicKeywords || [],
        });
  
        console.log("내 정보:", user);
      } catch (error) {
        console.error("마이페이지 데이터 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);
  

  // 프로필 수정
  const handleProfileSave = async (updatedData: any) => {
    try {
      const profileData = {
        nickname: updatedData.nickname || userData.nickname,
        infoTitle: updatedData.infoTitle || userData.infoTitle,
        infoContent: updatedData.infoContent || userData.infoContent,
        mbti: updatedData.mbti || userData.mbti,
        campus: updatedData.campus || userData.campus,
        country: updatedData.country || userData.country,
      };
      console.log("📤 PATCH body:", JSON.stringify(profileData, null, 2));
      await axiosInstance.patch("/api/users/me", profileData);
  
      // 언어 수정
      const nativeArray = (Array.isArray(updatedData.nativeLanguages)
      ? updatedData.nativeLanguages
      : updatedData.nativeLanguages
      ? [updatedData.nativeLanguages]
      : []
    ).map((lang: string) => LANGUAGE_REVERSE_MAP[lang] || lang)


    const learnArray = (Array.isArray(updatedData.learnLanguages)
      ? updatedData.learnLanguages
      : updatedData.learnLanguages
      ? [updatedData.learnLanguages]
      : []
    ).map((lang: string) => LANGUAGE_REVERSE_MAP[lang] || lang)


      if (nativeArray.length > 0 || learnArray.length > 0) {
        await axiosInstance.put("/api/users/me/languages", {
          nativeCodes: nativeArray,
          learnCodes: learnArray,
        });
        setLanguages({ nativeCodes: nativeArray, learnCodes: learnArray });
      }
  
      // 키워드 수정: 값이 있을 때만 요청 + 상태 반영
      if (
        updatedData.personalityKeywords !== undefined ||
        updatedData.hobbyKeywords !== undefined ||
        updatedData.topicKeywords !== undefined
      ){
        await axiosInstance.put("/api/users/me/keywords", {
          personality: updatedData.personalityKeywords || [],
          hobby: updatedData.hobbyKeywords || [],
          topic: updatedData.topicKeywords || [],
        });
  
        setKeywords({
          personality: updatedData.personalityKeywords || [],
          hobby: updatedData.hobbyKeywords || [],
          topic: updatedData.topicKeywords || [],
        });
      }
  
      alert("프로필이 성공적으로 수정되었습니다!");
  
      setUserData((prev: any) => ({
      ...prev,
      nickname: updatedData.nickname ?? prev.nickname,
      infoTitle: updatedData.infoTitle ?? prev.infoTitle,
      infoContent: updatedData.infoContent ?? prev.infoContent,
      mbti: updatedData.mbti ?? prev.mbti,
      campus: updatedData.campus ?? prev.campus,
      country: updatedData.country ?? prev.country,
    }));
      setIsEditMode(false);
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정 중 오류가 발생했습니다.");
    }
  };
  

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className="H1">My Page</PageTitle>

        {!isLoading && userData && (
          <ProfileCard
            userId={userData.id}
            username={userData.username}
            nickname={userData.nickname}
            mbti={userData.mbti}
            country={userData.country}
            profileImage={userData.profileImageUrl}
            infoTitle={userData.infoTitle}
            infoContent={userData.infoContent}
            keywords={[
              ...keywords.personality,
              ...keywords.hobby,
              ...keywords.topic,
            ]}
            campus={userData.campus}
            nativeLanguages={languages.nativeCodes.map(code => LANGUAGE_MAP[code] || code)}
            learnLanguages={languages.learnCodes.map(code => LANGUAGE_MAP[code] || code)}
            email={userData.email}
            isOwner={true}
            isEditMode={isEditMode}
            onEdit={() => setIsEditMode(true)}
            onSave={handleProfileSave}
            onCancel={() => setIsEditMode(false)}
          />
        )}

        {/* 활동 탭 (게시글, 댓글 등) */}
        <ActivityTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          posts={[]} // 나중에 실제 API 연동
          comments={[]} // 나중에 실제 API 연동
        />
      </ContentWrapper>
    </Container>
  );
};

export default Mypage;
