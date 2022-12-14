FROM nginx

LABEL maintainer=jnpf-team

ENV WORKDIR /home/jnpfsoft/jnpf-web

COPY dist ${WORKDIR}

COPY conf/default.conf /etc/nginx/conf.d/

EXPOSE 80