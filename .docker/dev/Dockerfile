FROM oven/bun:1.2-alpine AS build

WORKDIR /app

# copy sources
COPY . .

# install deps
RUN bun install

# build the app
RUN bun run build

# run the app
CMD ["bun", "start:prod"]

# expose app port
EXPOSE 3000
