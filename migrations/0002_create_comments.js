/**
 * @file comments migration
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

exports.up = async knex => { 
  await knex.raw(`
    CREATE TABLE comments (
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      created_at INTEGER NOT NULL,
      post_id UUID NOT NULL,

      FOREIGN KEY (post_id) REFERENCES posts(id)
    );
  `);
};

exports.down = async knex => { 
  await knex.raw(`
    DROP TABLE comments;
  `);
};
