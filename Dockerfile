FROM lixing1611/bdms_api_tms

MAINTAINER gaobiyu1702 gaobiyu1702@1gene.com.cn

COPY deploy/entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

RUN mkdir /www/lung-cancer/ -p
WORKDIR /www/lung-cancer/
COPY . /www/lung-cancer/

ENTRYPOINT ["/entrypoint.sh"]
