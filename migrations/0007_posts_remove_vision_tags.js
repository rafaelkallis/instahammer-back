/**
 * @file remove vision tags posts migration
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

exports.up = async knex => { 
  await knex.raw(`
    ALTER TABLE posts
      DROP COLUMN vision_tags;
  `);
};

exports.down = async knex => { 
  await knex.raw(`
    ALTER TABLE posts
      ADD COLUMN vision_tags VARCHAR(255)[];

    UPDATE posts SET vision_tags = '{}';

    ALTER TABLE posts
      ALTER COLUMN vision_tags SET NOT NULL;
  `);
};
