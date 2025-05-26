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
      type: 'varchar(72)',
      notNull: true,
    },
    createAt: {
      type: 'timestamptz',
      notNUll: true,
      default: pgm.func('now()'),
    },
    updateAt: {
      type: 'timestamptz',
      notNUll: true,
      default: pgm.func('now()'),
    },
  });
};

exports.down = false;
