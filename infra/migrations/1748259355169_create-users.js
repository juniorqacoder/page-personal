exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    username: {
      type: 'varchar(30)',
      notNull: true,
      unique: true,
    },
    email: {
      type: 'varchar(254)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'varchar(60)',
      notNull: true,
    },
    create_at: {
      type: 'timestamptz',
      notNUll: true,
      default: pgm.func('timezone(\'utc\', now())'),
    },
    update_at: {
      type: 'timestamptz',
      notNUll: true,
      default: pgm.func('timezone(\'utc\', now())'),
    },
  });
};

exports.down = false;
