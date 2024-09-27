pnpm i
docker network create -d bridge npm
docker compose -f "docker-compose-mongo.yml" up -d --build
pnpm run prisma
