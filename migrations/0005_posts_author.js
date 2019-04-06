/**
 * @file author posts migration
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

exports.up = async knex => { 
  await knex.raw(`
    ALTER TABLE posts
      ADD COLUMN author VARCHAR(255);

    UPDATE posts SET author = 'Anonymous';

    ALTER TABLE posts
      ALTER COLUMN author SET NOT NULL;
  `);
};

exports.down = async knex => { 
  await knex.raw(`
    ALTER TABLE posts
      DROP COLUMN author;
  `);
};
