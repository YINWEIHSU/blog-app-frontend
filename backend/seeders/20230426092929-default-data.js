'use strict';

const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}
const SEED_CATEGORIES = [
  'Life',
  'Work',
  'Learning'
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userId = await queryInterface.bulkInsert('Users', [{
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: bcrypt.hashSync(SEED_USER.password, bcrypt.genSaltSync(10), null),
      created_at: new Date(),
      updated_at: new Date()
    }], {})
    const categoryId = await queryInterface.bulkInsert('Categories',
      SEED_CATEGORIES.map((item, index) =>
      ({
        name: item,
        created_at: new Date(),
        updated_at: new Date()
      })
      ), {})
    await queryInterface.bulkInsert('Posts',
      Array.from({ length: 10 }).map((_, i) =>
      ({
        title: `title-${i}`,
        content: `content-${i}`,
        user_id: userId,
        category_id: categoryId,
        status: 'draft',
        img:'https://live.staticflickr.com/65535/49187844993_0f6ec0c349_b.jpg',
        created_at: new Date(),
        updated_at: new Date()
      })
      ), {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {})
    await queryInterface.bulkDelete('Users', null, {}) 
    await queryInterface.bulkDelete('Categories', null, {})
  }
  }
