/**
 * @file comments title text migration
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

exports.up = async knex => { 
  await knex.raw(`
    ALTER TABLE comments
      RENAME COLUMN title TO text;
    ALTER TABLE comments
      ALTER COLUMN text TYPE VARCHAR(1024);
  `);
};

exports.down = async knex => { 
  await knex.raw(`
    ALTER TABLE comments
      RENAME COLUMN text TO title;
    ALTER TABLE comments
      ALTER COLUMN title TYPE VARCHAR(255);
  `);
};
