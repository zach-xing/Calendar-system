import styled from "@emotion/styled";

export const LayoutCalendar = styled.div`
  width: 360px;
  margin: 0 auto;
  padding: 0 20px;
`;

/** 渲染单元格的 UI style */
export const CellStyleBox = styled.div<{ isNow: boolean; isCurMonth: boolean }>`
  color: ${(props) =>
    props.isNow
      ? "#1677ff"
      : props.isCurMonth
      ? "rgba(0, 0, 0, 0.88)"
      : "rgba(0, 0, 0, 0.25)"};
  border: ${(props) => (props.isNow ? "1px solid #1677ff" : "none")};
  border-radius: 5px;
  .isSelected {
    border-radius: 5px;
    color: white;
    background-color: #1677ff;
  }
`;

export const DotBox = styled.div<{ isShow: boolean }>`
  width: 3px;
  height: 3px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: ${(props) => (props.isShow ? "blue" : "white")};
`;
