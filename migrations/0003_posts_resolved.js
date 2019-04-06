/**
 * @file resolved posts migration
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

exports.up = async knex => { 
  await knex.raw(`
    ALTER TABLE posts
      ADD COLUMN is_resolved BOOLEAN;

    UPDATE posts SET is_resolved = FALSE;

    ALTER TABLE posts
      ALTER COLUMN is_resolved SET NOT NULL;
  `);
};

exports.down = async knex => { 
  await knex.raw(`
    ALTER TABLE posts
      DROP COLUMN is_resolved;
  `);
};
