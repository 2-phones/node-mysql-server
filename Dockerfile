# FROM node:12: Docker Hub에 올라와 있는 node(태그 12) 이미지를 받는다.
From node:16

# WORKDIR /app: 이미지를 받을 Directory를 /app으로 설정한다.
WROKDIR /usr/src/app

COPY packge*.json ./

# RUN npm install: Node Package Manager를 사용해 Dependancy들을 설치한다.
RUN npm install

# COPY . . : 설치된 파일을 복사한다.
COPY . .

# EXPOSE 8080: 8080 포트를 개방하여 외부 접속이 가능하도록 한다.
EXPOSE 8080

# CMD [ "node", "server.js" ]: 서버를 실행한다.
CMD ["npm","start"]