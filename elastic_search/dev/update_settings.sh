curl -XPOST 'localhost:9200/yflist-development/_close'
curl -XPOST 'localhost:9200/yflist-development/_settings' -d @../settings.json
curl -XPOST 'localhost:9200/yflist-development/_open'