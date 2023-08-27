import styled from "styled-components";
import { motion } from 'framer-motion'

export const Wrapper = styled(motion.div)`
  cursor: pointer;
  padding-top: ${props => props['no-pad'] ? 0 : '4rem'};
  height: ${props => props['no-pad'] ? '100%' : '100vh'};
  width: 100%;
  overflow: auto;
  background-image : ${props => props.bg ? `url(${props.bg})` : ''};
  background-repeat : no-repeat;
  background-size : cover;
  max-height: calc(100vh - 2rem);
  overflow-y: scroll;

  .colored-select-yellow {
    .ant-select-selection {
      color : white;
      background-color : #ff9c01 !important;
    }
  }

  .colored-select-blue {
    .ant-select-selection {
      color : white;
      background-color : #0084e6 !important;
    }
  }

  .colored-select-green {
    .ant-select-selection {
      color : white;
      background-color : #00ba69 !important;
    }
  }

  .colored-select-orange {
    .ant-select-selection {
      color : white;
      background-color : olivedrab !important;
    }
  }
`;

// Wrapper.defaultProps = {
//     animate : { opacity: [0, 1], x:[1920, 0] },
//     transition : {duration: 0.2 }
// }

export const Img = styled.img`
  width: 1rem;
`;

export const TableWrapper = styled.div`
  cursor: pointer;
  padding-top: ${props => props['no-pad'] ? 0 : '4rem'};
  height: 100%;
  height: 100vh;
  overflow: none;
  display: flex;
  flex-flow: column;
  position : relative;
  /* width : 100%; */

  .table-container{
    position: relative;
    height: inherit;
    width : inherit;
    overflow : auto;
    display : flex;
    flex-grow : 1;

    .table-collapse {
      padding : 0;
      background-color: #f6f6f677;
    }

    .ant-collapse-header {
      padding : 0;
    }

    .ant-collapse-item {
      border : 0;
    }

    .ant-collapse-content-active {
      border : 0;
    }

    .ant-collapse-content-box {
      padding : 0
    }
  }
`;
