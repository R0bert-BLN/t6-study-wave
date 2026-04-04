FROM oven/bun:1.3.11-alpine

ARG USER=app
ARG UID=1000
ARG GID=1000

RUN apk add --no-cache \
    shadow \
    bash \
    curl \
    git \
    nano \
    unzip

RUN groupadd -g $GID $USER || true \
    && useradd -u $UID -g $GID -m -s /bin/bash $USER || true

WORKDIR /app

EXPOSE 5173

RUN chown -R $UID:$GID /app

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER $UID:$GID

ENTRYPOINT ["entrypoint.sh"]
CMD ["bash", "-c", "bun run dev --host 0.0.0.0"]
