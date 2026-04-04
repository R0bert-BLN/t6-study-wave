FROM dunglas/frankenphp:1.12-alpine

ARG USER=app
ARG UID=1000
ARG GID=1000

RUN apk add --no-cache \
    bash \
    curl \
    git \
    linux-headers \
    nano \
    postgresql-client \
    shadow \
    unzip \
    nodejs \
    npm

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

RUN install-php-extensions \
    pdo_pgsql \
    gd \
    intl \
    zip \
    bcmath \
    pcntl \
    sockets \
    redis

COPY --from=composer:2.9 /usr/bin/composer /usr/bin/composer

RUN groupadd -g $GID $USER || true \
    && useradd -u $UID -g $GID -m -s /bin/bash $USER || true

WORKDIR /app

EXPOSE 80

RUN setcap cap_net_bind_service=+ep /usr/local/bin/frankenphp

RUN mkdir -p /data/caddy && mkdir -p /config/caddy
RUN chown -R $UID:$GID /app /data /config

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER $UID:$GID

ENTRYPOINT ["entrypoint.sh"]
CMD ["frankenphp", "run", "--config", "/etc/frankenphp/Caddyfile", "--adapter", "caddyfile"]
