FROM openjdk:8-alpine

ARG VCS_REF
LABEL maintainer="Sergey Royz <zjor.se@gmail.com>" \
  org.label-schema.vcs-ref=$VCS_REF \
  org.label-schema.vcs-url="git@github.com:zjor/smtpie.git"

EXPOSE 8080

ADD "./smtpie.jar" "service.jar"

CMD ["sh", "-c", "/usr/bin/java ${JAVA_OPTS} -jar service.jar"]