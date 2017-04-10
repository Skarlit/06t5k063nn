curl -XPOST 'localhost:9200/yflist-development/character' -d @../mappings/character.json
curl -XPOST 'localhost:9200/yflist-development/voice' -d @../mappings/voice.json
curl -XPOST 'localhost:9200/yflist-development/medium' -d @../mappings/medium.json
curl -XPOST 'localhost:9200/yflist-development/artist' -d @../mappings/artist.json