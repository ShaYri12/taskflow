# syntax=docker/dockerfile:1.7-labs
FROM debian:trixie-slim AS build

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    rm -f /etc/apt/apt.conf.d/docker-clean \
    && apt-get update \
    && apt-get -y --no-install-recommends install \
        build-essential gcc make autoconf libtool bison \
        dpkg-dev pkg-config re2c locate \
        libmariadb-dev libmariadb-dev-compat libpq-dev libsqlite3-dev \
        libvips-dev default-libmysqlclient-dev libmagickwand-dev \
        libicu-dev libxml2-dev libxslt-dev libyaml-dev \
        sudo curl ca-certificates unzip git

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV MISE_DATA_DIR="/mise"
ENV MISE_CONFIG_DIR="/mise"
ENV MISE_CACHE_DIR="/mise/cache"
ENV MISE_INSTALL_PATH="/usr/local/bin/mise"
ENV PATH="/mise/shims:$PATH"

RUN curl https://mise.run | sh
RUN mkdir -p /app
RUN mkdir -p /opt/assets
RUN --mount=type=cache,target=/mise/cache,sharing=locked mise use --global "ubi:adwinying/php@8.3.29"
RUN curl -L --output /usr/bin/composer https://github.com/composer/composer/releases/download/2.9.2/composer.phar && chmod +x /usr/bin/composer
RUN --mount=type=cache,target=/mise/cache,sharing=locked mise use --global "node@24"
RUN --mount=type=cache,target=/mise/cache,sharing=locked mise use --global "pnpm@10"
WORKDIR /app
RUN echo 'OzsgQmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3BocC9waHAtc3JjL2Jsb2IvbWFzdGVyL3BocC5pbmktcHJvZHVjdGlvbgoKW1BIUF0KZW5naW5lID0gT24Kc2hvcnRfb3Blbl90YWcgPSBPbgpwcmVjaXNpb24gPSAxNApvdXRwdXRfYnVmZmVyaW5nID0gNDA5Ngp6bGliLm91dHB1dF9jb21wcmVzc2lvbiA9IE9mZgppbXBsaWNpdF9mbHVzaCA9IE9mZgp1bnNlcmlhbGl6ZV9jYWxsYmFja19mdW5jID0Kc2VyaWFsaXplX3ByZWNpc2lvbiA9IC0xCmRpc2FibGVfZnVuY3Rpb25zID0KZGlzYWJsZV9jbGFzc2VzID0KemVuZC5lbmFibGVfZ2MgPSBPbgp6ZW5kLmV4Y2VwdGlvbl9pZ25vcmVfYXJncyA9IE9uCnplbmQuZXhjZXB0aW9uX3N0cmluZ19wYXJhbV9tYXhfbGVuID0gMApleHBvc2VfcGhwID0gT24KbWF4X2V4ZWN1dGlvbl90aW1lID0gMzAwCm1heF9pbnB1dF90aW1lID0gMzAwCm1lbW9yeV9saW1pdCA9IDUxMk0KZXJyb3JfcmVwb3J0aW5nID0gRV9BTEwgJiB+RV9ERVBSRUNBVEVEICYgfkVfU1RSSUNUCmRpc3BsYXlfZXJyb3JzID0gT2ZmCmRpc3BsYXlfc3RhcnR1cF9lcnJvcnMgPSBPZmYKbG9nX2Vycm9ycyA9IE9uCmFjY2Vzc19sb2cgPSAvZGV2L3N0ZG91dAplcnJvcl9sb2cgPSAvZGV2L3N0ZGVycgppZ25vcmVfcmVwZWF0ZWRfZXJyb3JzID0gT2ZmCmlnbm9yZV9yZXBlYXRlZF9zb3VyY2UgPSBPZmYKcmVwb3J0X21lbWxlYWtzID0gT2ZmCnZhcmlhYmxlc19vcmRlciA9ICJHUENTIgpyZXF1ZXN0X29yZGVyID0gIkdQIgpyZWdpc3Rlcl9hcmdjX2FyZ3YgPSBPZmYKYXV0b19nbG9iYWxzX2ppdCA9IE9uCnBvc3RfbWF4X3NpemUgPSAxNTAwTQphdXRvX3ByZXBlbmRfZmlsZSA9CmF1dG9fYXBwZW5kX2ZpbGUgPQpkZWZhdWx0X21pbWV0eXBlID0gInRleHQvaHRtbCIKZGVmYXVsdF9jaGFyc2V0ID0gIlVURi04Igpkb2Nfcm9vdCA9CnVzZXJfZGlyID0KZW5hYmxlX2RsID0gT2ZmCmZpbGVfdXBsb2FkcyA9IE9uCnVwbG9hZF9tYXhfZmlsZXNpemUgPSAxNTAwTQptYXhfaW5wdXRfdmFycyA9IDYxNDQKbWF4X2ZpbGVfdXBsb2FkcyA9IDIwCmFsbG93X3VybF9mb3BlbiA9IE9uCmFsbG93X3VybF9pbmNsdWRlID0gT2ZmCmRlZmF1bHRfc29ja2V0X3RpbWVvdXQgPSA2MApTTVRQID0gbG9jYWxob3N0CnNtdHBfcG9ydCA9IDI1Cm1haWwuYWRkX3hfaGVhZGVyID0gT2ZmCm1haWwubWl4ZWRfbGZfYW5kX2NybGYgPSBPZmYKb2RiYy5hbGxvd19wZXJzaXN0ZW50ID0gT24Kb2RiYy5jaGVja19wZXJzaXN0ZW50ID0gT24Kb2RiYy5tYXhfcGVyc2lzdGVudCA9IC0xCm9kYmMubWF4X2xpbmtzID0gLTEKb2RiYy5kZWZhdWx0bHJsID0gNDA5NgpvZGJjLmRlZmF1bHRiaW5tb2RlID0gMQpteXNxbGkubWF4X3BlcnNpc3RlbnQgPSAtMQpteXNxbGkuYWxsb3dfcGVyc2lzdGVudCA9IE9uCm15c3FsaS5tYXhfbGlua3MgPSAtMQpteXNxbGkuZGVmYXVsdF9wb3J0ID0gMzMwNgpteXNxbGkuZGVmYXVsdF9zb2NrZXQgPQpteXNxbGkuZGVmYXVsdF9ob3N0ID0KbXlzcWxpLmRlZmF1bHRfdXNlciA9Cm15c3FsaS5kZWZhdWx0X3B3ID0KbXlzcWxuZC5jb2xsZWN0X3N0YXRpc3RpY3MgPSBPbgpteXNxbG5kLmNvbGxlY3RfbWVtb3J5X3N0YXRpc3RpY3MgPSBPZmYKcGdzcWwuYWxsb3dfcGVyc2lzdGVudCA9IE9uCnBnc3FsLmF1dG9fcmVzZXRfcGVyc2lzdGVudCA9IE9mZgpwZ3NxbC5tYXhfcGVyc2lzdGVudCA9IC0xCnBnc3FsLm1heF9saW5rcyA9IC0xCnBnc3FsLmlnbm9yZV9ub3RpY2UgPSAwCnBnc3FsLmxvZ19ub3RpY2UgPSAwCmJjbWF0aC5zY2FsZSA9IDAKc2Vzc2lvbi5zYXZlX2hhbmRsZXIgPSBmaWxlcwpzZXNzaW9uLnVzZV9zdHJpY3RfbW9kZSA9IDAKc2Vzc2lvbi51c2VfY29va2llcyA9IDEKc2Vzc2lvbi51c2Vfb25seV9jb29raWVzID0gMQpzZXNzaW9uLm5hbWUgPSBQSFBTRVNTSUQKc2Vzc2lvbi5hdXRvX3N0YXJ0ID0gMApzZXNzaW9uLmNvb2tpZV9saWZldGltZSA9IDAKc2Vzc2lvbi5jb29raWVfcGF0aCA9IC8Kc2Vzc2lvbi5jb29raWVfZG9tYWluID0Kc2Vzc2lvbi5jb29raWVfaHR0cG9ubHkgPQpzZXNzaW9uLmNvb2tpZV9zYW1lc2l0ZSA9CnNlc3Npb24uc2VyaWFsaXplX2hhbmRsZXIgPSBwaHAKc2Vzc2lvbi5nY19wcm9iYWJpbGl0eSA9IDEKc2Vzc2lvbi5nY19kaXZpc29yID0gMTAwMApzZXNzaW9uLmdjX21heGxpZmV0aW1lID0gMTQ0MApzZXNzaW9uLmNhY2hlX2xpbWl0ZXIgPSBub2NhY2hlCnNlc3Npb24uY2FjaGVfZXhwaXJlID0gMTgwCnNlc3Npb24udXNlX3RyYW5zX3NpZCA9IDAKc2Vzc2lvbi5zaWRfbGVuZ3RoID0gMjYKc2Vzc2lvbi50cmFuc19zaWRfdGFncyA9ICJhPWhyZWYsYXJlYT1ocmVmLGZyYW1lPXNyYyxmb3JtPSIKc2Vzc2lvbi5zaWRfYml0c19wZXJfY2hhcmFjdGVyID0gNQp6ZW5kLmFzc2VydGlvbnMgPSAtMQp0aWR5LmNsZWFuX291dHB1dCA9IE9mZgpzb2FwLndzZGxfY2FjaGVfZW5hYmxlZCA9IDEKc29hcC53c2RsX2NhY2hlX2RpciA9ICIvdG1wIgpzb2FwLndzZGxfY2FjaGVfdHRsID0gODY0MDAKc29hcC53c2RsX2NhY2hlX2xpbWl0ID0gNQpsZGFwLm1heF9saW5rcyA9IC0xCgpbUGRvX215c3FsXQpwZG9fbXlzcWwuZGVmYXVsdF9zb2NrZXQgPQo=' | base64 -d > /opt/assets/php.ini

# KEY CHANGE: Added --no-dev flag to exclude development dependencies
ENV COMPOSER_HOME=/tmp COMPOSER_FUND=0 COMPOSER_ALLOW_SUPERUSER=1
RUN \
  --mount=type=bind,source=composer.json,target=composer.json \
  --mount=type=bind,source=composer.lock,target=composer.lock \
  composer install --optimize-autoloader --ignore-platform-reqs --no-scripts --no-interaction --no-dev

ENV pnpm_config_minimum_release_age=0 CI=true pnpm_config_dangerously_allow_node_in_dockerfile=true
RUN \
  --mount=type=bind,source=package.json,target=package.json \
  pnpm install

COPY \
  --exclude=.git \
  --exclude=node_modules \
  --exclude=vendor \
  . .

# Only run the build once with pnpm
RUN pnpm run build

FROM scratch
COPY --from=build /app /app
COPY --from=build /opt/assets /opt/assets
