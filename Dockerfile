FROM node:22 AS installer

WORKDIR /app
COPY "package.json" ./
COPY "yarn.lock" ./
RUN yarn --peer


FROM node:22 AS playwright

WORKDIR /app
COPY --from=installer /app /app
RUN yarn playwright install chromium --with-deps --only-shell


FROM playwright AS release

WORKDIR /app
COPY . .
EXPOSE 6006
CMD ["yarn", "storybook"]