import styled from 'styled-components';

import sx from 'utils/createSx';

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
    width: 80%;
    margin-right: 12px;
  }

  .box {
    box-shadow: 1px 1px 1px 6px rgba(0, 0, 0, 0.2);
    background-color: #d3d3d3;
    padding: 16px 32px;
    min-width: 18rem;
    min-height: 26rem;
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 15px;
    width: 95%;
    height: 95%;
    ul {
      list-style: none;
      padding-left: 0;
      max-height: 300px;
      overflow: auto;

      li + li {
        margin-top: 16px;
      }

      button {
        width: 80%;
        padding: 8px;
        cursor: pointer;
      }
    }
  }

  .search-container {
    width: 75%;
    display: flex;
    margin-bottom: 12px;
  }

  /* estilo da barra de rolagem */
  div::-webkit-scrollbar {
    width: 8px; /* largura da barra de rolagem */
  }

  div::-webkit-scrollbar-thumb {
    background-color: rgba(
      0,
      0,
      0,
      0.2
    ); /* cor do "polegar" da barra de rolagem */
    border-radius: 5px; /* borda arredondada do "polegar" */
  }

  .tab {
    background: #d3d3d3;
    margin-bottom: 12px;
    border-radius: 12px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center; /* centraliza os itens */
    align-items: center;
    width: 250px; /* ocupa toda a largura do componente pai */
  }

  .MuiTabs-flexContainer {
    width: 100%; /* ocupa toda a largura do componente pai */
  }

  .MuiTab-root {
    min-width: auto; /* remove a largura mínima padrão da Tab */
    width: 50%; /* define a largura das Tabs */
  }

  .MuiTabs-indicator {
    height: 4px; /* altura da barra */
  }

  .Mui-selected {
    background-color: #ffffff; /* cor de fundo da tab selecionada */
    color: #000000; /* cor do texto da tab selecionada */
  }

  /* estilos para a barra da tab selecionada */
  .MuiTabs-indicator {
    background-color: #000000; /* cor da barra da tab selecionada */
  }

  .map {
    background-color: #d3d3d3;
    padding: 16px 16px;
    min-width: 18rem;
    min-height: 26rem;
    border-radius: 4px;
    width: 95%;
    height: 95%;
  }

  .pagination {
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .pagination li {
    margin: 5px;
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .pagination li:hover {
    background-color: #eee;
    color: black;
  }

  .pagination .active {
    background-color: black;
    color: #fff;
  }

  .pagination .break-me {
    display: none;
  }
`;

export default sx({
  button: { backgroundColor: '#4368dc', color: 'white', marginLeft: '14px' },
});
