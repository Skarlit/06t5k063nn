mkdir -p $ROOT_DIR/vol/data

$(docker images | grep -q $VOLUME_NAME)
if [ $? -eq 0 ]; then
    docker run $VOLUME_NAME
else
    docker create --name dev_vol -v $ROOT_DIR/vol/data:/var/lib/postgresql/data debian
fi

$(docker images | grep -q $DB_NAME)
if [ $? -eq 0 ]; then
    docker run $DB_NAME
else
    docker run --rm -p 5432:5432 --name postgres_dev --volumes-from dev_vol -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -e POSTGRES_USER=$POSTGRES_USER -e POSTGRES_DB=$POSTGRES_DB postgres:latest
fi
