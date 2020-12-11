exports.up = function (knex) {
  return knex.schema
    .createTable("ingredients", (tbl) => {
      tbl.increments("ingredientId");
      tbl.string("ingredientName", 128).notNullable();
    })
    .createTable("recipes", (tbl) => {
      tbl.increments("recipeId");
      tbl.string("recipeName", 128).notNullable();
    })
    .createTable("recipeIngredients", (tbl) => {
      tbl.increments("recipeList");
      tbl
        .integer("recipeId")
        .unsigned()
        .notNullable()
        .references("recipeId")
        .inTable("recipes")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      tbl
        .integer("ingredientId")
        .unsigned()
        .notNullable()
        .references("ingredientId")
        .inTable("ingredients")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      tbl.integer("ingredient_quantity").notNullable();
    })
    .createTable("steps", (tbl) => {
      tbl.increments("recipe_step_id");
      tbl.integer("step_number").notNullable();
      tbl
        .integer("recipeId")
        .unsigned()
        .notNullable()
        .references("recipeId")
        .inTable("recipes")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      tbl.string("step_details").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("steps")
    .dropTableIfExists("recipeIngredients")
    .dropTableIfExists("recipes")
    .dropTableIfExists("ingredients")
};
