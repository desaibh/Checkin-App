INSERT INTO checkins (note, latitude, longitude, streetaddress, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *;
