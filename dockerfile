FROM		node:latest
MAINTAINER	jogakdal@gmail.com


EXPOSE		3000

RUN 		git clone https://github.com/jogakdal/fin2b-test

WORKDIR 	/fin2b-test

RUN 		npm install

CMD 		npm start


