INSERT INTO checkins (latitude, longitude) VALUES($1, $2) RETURNING *;
