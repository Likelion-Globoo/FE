import { useState } from "react";
import styled from "styled-components";
import ProfileCard from "../components/ProfileCard";
import ActivityTabs from "../components/ActivityTabs";
import { type UserMeResponse, type Post } from "../types/mypage&profile.types";

// 목 데이터(나중에 삭제)
const mockUserData: UserMeResponse = {
  id: 1,
  email: "likelion@hufs.ac.kr",
  username: "홍길동",
  profile: {
    nickname: "멋쟁이",
    campus: "GLOBAL",
    mbti: "ENFP",
    country: "KR",
    profileImage: null,
    infoTitle: "저는 운동과 음악을 좋아하는 학생입니다 저와 같이 스터디를 즐기실 분을 찾고 있어요",
    infoContent: "저는 친구들과 평소 친구들과 외국어 회화 스터디를 즐겨하며 회화 채널을 자주 봐요. 다른 사람들과 함께 모여 언어를 배우는 것에 흥미를 느낍니다. 평소 친구들과 외국어 회화 스터디를 즐겨하며 회화 채널을 자주 봐요. 다른 사람들과 함께 모여 언어를 배우는 것에 흥미를 느낍니다. 평소 친구들과 외국어 회화 스터디를 즐겨하며 회화 채널을 자주 봐요. 다른 사람들과 함께 모여 언어를 배우는 것에 흥미를 느낍니다.  스터디를 즐기실 분을 찾고있어요. 다른 사람들과 함께하는 것을 즐기며 늘 긍정적인 에너지를 드립니다. 저는 친구들과 외국어 스터디를 즐겨하시 하실 분을 찾고 있어요. 다른 사람들과 함께하는 것을 즐기며 늘 긍정적인 에너지를 빠드는 것을 좋아요."
  },
  languages: [
    { code: "한국어", type: "NATIVE" },
    { code: "영어", type: "LEARN" }
  ],
  keywords: [
    { id: 1, name: "긍정적" },
    { id: 2, name: "운동" },
    { id: 3, name: "음악" }
  ]
};

const mockPosts: Post[] = [
  {
    id: "1",
    status: "모집중",
    currentParticipants: 3,
    maxParticipants: 15,
    title: "2025-2 영어 회화 스터디 참여자 모집합니다.(비대면 가능)",
    tags: ["글로벌캠퍼스", "한국어", "영어"],
    createdAt: "2025-10-20"
  },
  {
    id: "2",
    status: "마감",
    currentParticipants: 15,
    maxParticipants: 15,
    title: "2025-2 영어 회화 스터디 참여자 모집합니다.(비대면 가능)",
    tags: ["글로벌캠퍼스", "한국어", "영어"],
    createdAt: "2025-10-15"
  },
  {
    id: "3",
    status: "모집중",
    currentParticipants: 3,
    maxParticipants: 13,
    title: "2025-2 영어 회화 스터디 참여자 모집합니다.(비대면 가능)",
    tags: ["글로벌캠퍼스", "한국어", "영어"],
    createdAt: "2025-10-18"
  },
  {
    id: "4",
    status: "모집중",
    currentParticipants: 3,
    maxParticipants: 15,
    title: "2025-2 영어 회화 스터디 참여자 모집합니다.(비대면 가능)",
    tags: ["글로벌캠퍼스", "한국어", "영어"],
    createdAt: "2025-10-12"
  }
];

const mockComments: { id: number; postId: number; postTitle: string; content: string; }[] = [
  { 
    id: 101, 
    postId: 1, 
    postTitle: "2025-2 영어 회화 스터디 참여자 모집합니다.(비대면 가능)", 
    content: "영어 마침 배워보고 싶었는데 참여하나요? 친구랑 같이 참여해보고 싶어요!" 
  },
  { 
    id: 102, 
    postId: 2, 
    postTitle: "2025-2 영어 회화 스터디 참여자 모집합니다.(비대면 가능)", 
    content: "스터디 내용이 궁금해요! 자세한 커리큘럼 알려주실 수 있나요?" 
  },
  { 
    id: 103, 
    postId: 3, 
    postTitle: "2025-2 영어 회화 스터디 참여자 모집합니다.(비대면 가능)", 
    content: "저도 참여하고 싶은데 마감인가요? 대기 걸어둘게요!" 
  }
];


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
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleProfileEdit = () => {
    setIsEditMode(true);
  };

  const handleProfileSave = (updatedData: any) => {
    console.log("저장된 데이터:", updatedData);
    // API 호출하여 데이터 저장
    setIsEditMode(false);
  };

  const handleProfileCancel = () => {
    setIsEditMode(false);
  };

  // 사용언어, 선호언어 정보 추출
  const nativeLanguages = mockUserData.languages
    .filter(lang => lang.type === 'NATIVE')
    .map(lang => lang.code);
  
  const learnLanguages = mockUserData.languages
    .filter(lang => lang.type === 'LEARN')
    .map(lang => lang.code);

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className="H1">My Page</PageTitle>
        
        <ProfileCard 
          userId={mockUserData.id}
          username={mockUserData.username}
          nickname={mockUserData.profile.nickname}
          mbti={mockUserData.profile.mbti}
          country={mockUserData.profile.country}
          profileImage={mockUserData.profile.profileImage}
          infoTitle={mockUserData.profile.infoTitle}
          infoContent={mockUserData.profile.infoContent}
          keywords={mockUserData.keywords}

          campus={mockUserData.profile.campus}
          nativeLanguages={nativeLanguages}
          learnLanguages={learnLanguages}
          email={mockUserData.email}

          isOwner={true}
          isEditMode={isEditMode}
          onEdit={handleProfileEdit}
          onSave={handleProfileSave}
          onCancel={handleProfileCancel}
        />
        
        <ActivityTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          posts={mockPosts}
          comments={mockComments}
        />
      </ContentWrapper>
    </Container>
  );
};

export default Mypage;