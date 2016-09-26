mkdir -p $ROOT_DIR/vol/data
docker stop postgres_dev
docker stop dev_vol
docker create --name dev_vol -v $ROOT_DIR/vol/data:/var/lib/postgresql/data debian
docker run --rm -p 5432:5432 --name postgres_dev --volumes-from dev_vol -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -e POSTGRES_USER=$POSTGRES_USER -e POSTGRES_DB=$POSTGRES_DB postgres:latest
