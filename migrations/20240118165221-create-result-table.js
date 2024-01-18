'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('tbl_results', {
    columns: {
      result_id: { type: 'INT', primaryKey: true },
      data: { type: 'TEXT', notNull: true },
      result: { type: 'BOOL', notNull: true },
      active_row: { type: 'enum("0","1")', notNull: true, default: '1' },
      created_at: { type: 'timestamp', notNull: true, default: 'CURRENT_TIMESTAMP' },
      updated_at: { type: 'timestamp', notNull: true, default: 'CURRENT_TIMESTAMP' },
    },
    ifNotExists: true
  });
};

exports.down = function(db) {
  return db.dropTable('tbl_results');
};

exports._meta = {
  "version": 1
};
