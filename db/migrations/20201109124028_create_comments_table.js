
exports.up = function (knex) {
    return knex.schema.createTable('comments', (comments) => {
        comments.increments('comment_id').primary();
        comments.text('author').references('users.username');
        comments.integer('article_id')
        .references('articles.article_id')
        .onDelete('SET NULL')
        comments.integer('votes').defaultTo(0);
        comments.timestamp('created_at').defaultTo(knex.fn.now());
        comments.text('body')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('comments');
};
