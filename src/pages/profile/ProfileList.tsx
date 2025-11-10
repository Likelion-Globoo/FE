import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProfileBanner from "../../components/ProfileBanner";
import HeaderImg from "../../assets/img-miniBoo.svg";
import axiosInstance from "../../../axiosInstance";

type Campus = "SEOUL" | "GLOBAL";
type LanguageCode = string;
type CountryCode = string;

interface Language {
  code: string;
  name: string;
}

export interface ProfileCardItem {
  userId: number;
  nickname: string;
  campus: Campus | null;
  country: CountryCode | null;
  mbti: string | null;
  profileImage: string | null;
  nativeLanguages: Language[];
  learnLanguages: Language[];
  keywords: { id: number; name: string }[];
  infoTitle: string | null;
  infoContent: string | null;
}

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
`;

const HeaderTextArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const HeaderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--black);
  margin-bottom: 8px;
`;

const SubText = styled.p`
  font-size: 1rem;
  color: var(--gray-600);
  margin-bottom: 30px;
`;

const FilterSection = styled.div`
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const FilterPlaceholder = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  color: var(--gray-500);
  font-size: 0.9rem;

  span {
    padding: 8px 12px;
    background-color: var(--gray-100);
    border-radius: 8px;
  }
`;

const SearchButton = styled.button`
  padding: 10px 24px;
  background-color: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-dark);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--gray-400);
  margin-bottom: 20px;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  min-width: 36px;
  border: 1px solid ${(props) => (props.$active ? "var(--primary)" : "var(--gray-300)")};
  background-color: ${(props) => (props.$active ? "var(--primary)" : "var(--white)")};
  color: ${(props) => (props.$active ? "var(--white)" : "var(--primary)")};
  border-radius: 6px;
  cursor: pointer;
  font-weight: ${(props) => (props.$active ? "600" : "400")};
  transition: all 0.2s;
`;

const ProfileList: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ProfileCardItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const profilesPerPage = 8;

  // 필터 없이 전체 조회
  const fetchProfiles = async (page = 0) => {
    try {
      const res = await axiosInstance.get("/api/profiles", {
        params: { page, size: profilesPerPage },
      });
      setProfiles(res.data.content);
      setTotalPages(res.data.totalPages);
      console.log("프로필 불러오기 성공:", res.data);
    } catch (error) {
      console.error("프로필 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchProfiles(currentPage);
  }, [currentPage]);

  const handleProfileClick = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageContainer>
      <HeaderSection>
        <HeaderImage src={HeaderImg} alt="프로필 조회" />
        <HeaderTextArea>
          <HeaderTitle>프로필 조회</HeaderTitle>
          <SubText>나와 Fit이 맞는 친구 찾기</SubText>
        </HeaderTextArea>
      </HeaderSection>

      <FilterSection>
        <FilterPlaceholder>
          <span>캠퍼스</span>
          <span>사용 언어</span>
          <span>키워드</span>
        </FilterPlaceholder>
        <SearchButton onClick={() => fetchProfiles(0)}>조회</SearchButton>
      </FilterSection>

      <SectionTitle>친구들의 프로필 보기</SectionTitle>

      <ProfileGrid>
        {profiles.map((profile) => (
          <ProfileBanner
            key={profile.userId}
            userId={profile.userId}
            nickname={profile.nickname}
            campus={profile.campus}
            country={profile.country}
            mbti={profile.mbti}
            profileImage={profile.profileImage}
            languages={{
              native: profile.nativeLanguages.map((l) => l.code),
              learn: profile.learnLanguages.map((l) => l.code),
            }}
            keywords={profile.keywords.map((k) => k.name)}
            intro={
              profile.infoTitle && profile.infoContent
                ? `${profile.infoTitle}\n${profile.infoContent}`
                : ""
            }
            onClick={() => handleProfileClick(profile.userId)}
          />
        ))}
      </ProfileGrid>

      {totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i}
              $active={currentPage === i}
              onClick={() => handlePageChange(i)}
            >
              {i + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      )}
    </PageContainer>
  );
};

export default ProfileList;
