/**
 * @file posts migration
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

exports.up = async knex => { 
  await knex.raw(`
    CREATE TABLE posts (
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(1024),
      created_at INTEGER NOT NULL,
      location JSONB NOT NULL,
      post_tags VARCHAR(255)[] NOT NULL,
      image VARCHAR(255) NOT NULL,
      image_tags JSONB[] NOT NULL
    );
  `);
};

exports.down = async knex => { 
  await knex.raw(`
    DROP TABLE posts;
  `);
};
