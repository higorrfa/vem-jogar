# Vem jogar!

### Descrição ###

Plataforma para gerenciar e participar de grupos de práticas esportivas. 

Os usuários podem criar seus próprios grupos de esportes ou participar de grupos existentes, buscando por esportes de sua preferência e localização.

### Organização do Projeto ###

* backend
* frontend

### Configuração ###

* Pré-Requisitos
    * Node.js - v.18.16.0
    * npm - v.7.0.0

- Instalando Node.js
```
$ sudo apt-get update
$ sudo apt-get install nodejs
```
- Instalando npm
```
$ sudo apt-get install npm
```

### Configurando o Front-End ###
* Instalando as dependências via npm
```
$ cd frontend/
$ npm install
```

### Configurando o Back-End ###
* Instalando as dependências via npm
```
$ cd backend/
$ npm install
```

### Banco de Dados ###
* Banco de dados Local:
    * Criar um banco de dados PostgreSQL com as seguintes configurações:
        * Porta:  5432 (Padrão)
        * Database: vemjogar
        * Usuário: vemjogar
        * Senha: master

### Levantando a Aplicação em ambiente de desenvolvimento ###

* Levantando o Front-end:
```
$ cd frontend/
$ npm run dev
```
* Levantando o backend
```
$ cd backend/
$ npx ts-node src/server.ts
```


