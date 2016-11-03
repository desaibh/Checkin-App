UPDATE checkins SET note=^$2 WHERE id=$1 RETURNING *;
