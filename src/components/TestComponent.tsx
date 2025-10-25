// src/components/TestComponent.tsx
import React from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const Title = styled.h1`
  color: #333;
  font-size: 24px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  margin: 20px;
  text-align: center;
`;

// React 컴포넌트
const TestComponent: React.FC = () => {
  return (
    <Wrapper>
      <Title> styled-components 테스트</Title>
    </Wrapper>
  );
};

export default TestComponent;