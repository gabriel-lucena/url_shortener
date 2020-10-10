'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UrlscreatedSchema extends Schema {
  up () {
    this.create('urlscreateds', (table) => {
      table.increments()
      table.string('url').notNullable();
      table.string('code_url').notNullable().unique();
      table.timestamps()
    })
  }

  down () {
    this.drop('urlscreateds')
  }
}

module.exports = UrlscreatedSchema
