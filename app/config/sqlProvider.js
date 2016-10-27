const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const sqlProvider = {
  users: {
    all: sql('./sql/user/all.sql'),
    find: sql('./sql/user/find.sql'),
    create: sql('./sql/user/create.sql'),
    delete: sql('./sql/user/delete.sql'),
  },
  checkins: {
    all: sql('./sql/checkin/all.sql'),
    create: sql('./sql/checkin/create.sql'),
    delete: sql('./sql/checkin/delete.sql'),
    find: sql('./sql/checkin/find.sql'),
    update: sql('./sql/checkin/update.sql'),
  },
};

module.exports = sqlProvider;
