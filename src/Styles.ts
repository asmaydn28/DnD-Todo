import styled from "styled-components";

export const Page = styled.div`
  background-color: #303947;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 32px;
  background-color: #161b22;
  border-radius: 16px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.7);
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
`;

export const AddTodoContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
`;

export const AddInput = styled.input`
  padding: 12px;
  border: 1px solid #30363d;
  background-color: #0d1117;
  color: #c9d1d9;
  border-radius: 8px;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #58a6ff;
  }
`;

export const AddButton = styled.button`
  padding: 12px 16px;
  background-color: #238636;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #2ea043;
  }
`;

export const QuoteItem = styled.div`
  background: linear-gradient(135deg, #21262d, #2d333b);
  color: #fff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
  }
`;

export const DeleteButton = styled.button`
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #cc0000;
  }
`;

export const EditButton = styled.button`
  background-color: #2f81f7;
  color: white;
  border: none;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #1f6feb;
  }
`;