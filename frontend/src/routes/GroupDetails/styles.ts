import styled from 'styled-components';

export const Main = styled.main`
  position: absolute;
  margin-top: calc(3.75rem + 1rem);
  padding: 1rem;
  height: 100%;
  height: -moz-available;
  height: -webkit-fill-available;
  height: fill-available;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h3 {
    font-weight: bold;
  }

  p {
    max-width: 30rem;
    font-weight: 500;
  }

  .search {
    padding: 8px;
    width: 100%;
  }

  .box {
    background-color: white;
    padding: 16px 32px;

    width: 80%;
    height: 80%;

    min-width: 10rem;
    min-height: 23rem;

    .content {
      display: flex;
      gap: 64px;

      .description {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        padding: 16px;
        flex-basis: 150px;
        flex-grow: 1;
        height: 100%;
      }

      .buttons {
        flex-basis: 0;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          padding: 16px;
          width: 100%;
          border: none;
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 12px;
          background-color: #4368dc;
          color: white;
          box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.2);

          &:not([disabled]) {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
