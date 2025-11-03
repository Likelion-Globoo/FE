import styled from "styled-components";
import { type Post } from "../types/mypage&profile.types";
import ParticipantImg from "../assets/img-participant.svg";
import {type Comment} from "../types/mypage&profile.types";

interface ActivityTabsProps {
  activeTab: 'posts' | 'comments';
  onTabChange: (tab: 'posts' | 'comments') => void;
  posts: Post[];
  comments: Comment[]; 
}

const Container = styled.div`
  width: 100%;
`;

const TabHeader = styled.div`
  display: flex;
  border-bottom: 2px solid var(--gray);
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 1rem 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$active ? 'var(--primary)' : 'var(--gray-400)'};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: var(--primary)
  }
`;

//작성한 게시글 탭
const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PostItem = styled.div`
  background-color: var(--white);
  border: 1px solid var(--gray);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const StatusBadge = styled.span<{ $status: '모집중' | '마감' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  background-color: ${props => props.$status === '모집중' ? 'var(--primary)' : 'var(--gray)'};
  color: ${props => props.$status === '모집중' ? 'var(--white)' : 'var(--gray-400)'};
`;

const ParticipantInfo = styled.span`
  color: var(--gray-700);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PostTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: var(--black);
  padding-bottom: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PostTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  background-color: var(--skyblue);
  color: var(--white);
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const MoreButton = styled.button`
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

// 작성한 댓글 탭
const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CommentItem = styled.div`
  background-color: var(--white);
  border: 1px solid var(--gray);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
`;

const CommentBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  background-color: var(--primary);
  color: var(--white);
`;

const CommentParticipantInfo = styled.span`
  color: var(--gray-700);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommentTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const CommentTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  background-color: var(--skyblue);
  color: var(--white);
`;

const OriginalPostTitle = styled.h4`
  margin: 0 0 1rem 0;
  color: var(--black);
`;

const CommentContent = styled.p`
  margin: 0;
  padding: 1rem;
  background-color: var(--gray-text-filled);
  border-radius: 0.5rem;
  color: var(--gray-700);
  line-height: 1.6;
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ $variant?: 'delete' | 'edit' }>`
  padding: 0.5rem 1rem;
  border: 0.8px solid ${props => props.$variant === 'delete' ? 'var(--gray-400)' : 'var(--primary)'};
  border-radius: 0.5rem;
  background-color: ${props => props.$variant === 'delete' ? 'var(--white)' : 'var(--primary)'};
  color: ${props => props.$variant === 'delete' ? 'var(--gray-700)' : 'var(--white)'};
  cursor: pointer;
  transition: all 0.2s;

  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 4rem;
  color: var(--gray-400);
`;

const CommentList = ({ comments }: { comments: Comment[] }) => {
  if (comments.length === 0) {
    return <EmptyMessage className="Body1">작성한 댓글이 없습니다.</EmptyMessage>;
  }
  
  return (
    <CommentListContainer>
      {comments.map((comment) => (
        <CommentItem key={comment.id}>
          <CommentHeader>
            <CommentBadge className="Button2">모집중</CommentBadge>
            <CommentParticipantInfo className="Body2">
              <img src={ParticipantImg} />
              3명 / 15명
            </CommentParticipantInfo>
            <CommentTags>
              <CommentTag className="Button2"># 서울캠퍼스</CommentTag>
              <CommentTag className="Button2"># 글로벌캠퍼스</CommentTag>
              <CommentTag className="Button2"># 한국어</CommentTag>
              <CommentTag className="Button2"># 영어</CommentTag>
            </CommentTags>
          </CommentHeader>
          
          <OriginalPostTitle className="H4">{comment.postTitle}</OriginalPostTitle>
          
          <CommentContent className="Body2">
            {comment.content}
          </CommentContent>
          
          <CommentFooter>
            <ActionButton $variant="delete" className="Button1">
              삭제하기
            </ActionButton>
            <ActionButton $variant="edit" className="Button1">
              수정하기
            </ActionButton>
          </CommentFooter>
        </CommentItem>
      ))}
    </CommentListContainer>
  );
};// 😭삭제하기 -> 댓글 데이터 삭제 필요(api 연동), 수정하기 -> 페이지 이동 필요(수정 api 확인 후 진행)

const ActivityTabs = ({ activeTab, onTabChange, posts, comments }: ActivityTabsProps) => {
  return (
    <Container>
      <TabHeader>
        <Tab 
          $active={activeTab === 'posts'}
          onClick={() => onTabChange('posts')}
          className="H4"
        >
          작성한 게시물
        </Tab>
        <Tab 
          $active={activeTab === 'comments'}
          onClick={() => onTabChange('comments')}
          className="H4"
        >
          작성한 댓글
        </Tab>
      </TabHeader>

      {activeTab === 'posts' && (
        <PostList>
          {posts.length === 0 ? (
            <EmptyMessage className="Body1">작성한 게시물이 없습니다.</EmptyMessage>
          ) : (
            posts.map((post) => (
              <PostItem key={post.id}>
                <PostHeader>

                  <StatusBadge $status={post.status} className="Button2">
                    {post.status}
                  </StatusBadge>

                  <ParticipantInfo className="Body2">
                    <img src={ParticipantImg} />
                    {post.currentParticipants}명 / {post.maxParticipants}명
                  </ParticipantInfo>

                  <TagContainer>
                    {post.tags.map((tag, index) => (
                      <PostTag key={index} className="Button2"># {tag}</PostTag>
                    ))}
                  </TagContainer>
                </PostHeader>
                
                <PostTitle className="H4">{post.title}</PostTitle>
                
                <PostFooter>
                  <MoreButton className="Body2">더 보기 &gt;</MoreButton>
                </PostFooter>
              </PostItem>
            ))
          )}
        </PostList>
      )}

      {activeTab === 'comments' && (
        <CommentList comments={comments} />
      )}
    </Container>
  );
};

export default ActivityTabs;