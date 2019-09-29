'use strict'

const db = require('../server/db')
const {User, Picture, Category, Folder, Author} = require('../server/db/models')

// const authors = [
//   {
//     name: 'Kate Lei',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Yang Wu',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Ming Li',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   }
// ]

// const categories = [
//   {
//     category: 'All',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     category: 'Folwers',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     category: 'Animals',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     category: 'Fall',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     category: 'Spring',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     category: 'People',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   }
// ]

// const folders = [
//   {
//     folder: 'Folder092019',
//     authorId: 1,
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     folder: 'Folder092019',
//     authorId: 2,
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     folder: 'Folder092019',
//     authorId: 3,
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   }
// ]

// const pictures = [
//   {
//     name: 'Kids',
//     description: 'Loving Kids',
//     imageDir: 'pic20190920-2.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 1',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-7.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 2',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-9.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 3',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-10.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 4',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-11.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 5',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-12.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 6',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-13.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 7',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-14.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 8',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-15.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 9',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-16.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 10',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-17.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   },
//   {
//     name: 'Animal - 11',
//     description: 'Loving animals',
//     imageDir: 'pic20190920-18.png',
//     createdAt: '2019-09-21',
//     updatedAt: '2019-09-21'
//   }
// ]

async function seed() {
  await db.sync({force: true})
  //await db.sync()
  console.log('db synced!')

  // await Promise.all(
  //   categories.map(category => {
  //     return Category.create(category)
  //   })
  // )

  //  await Promise.all(
  //   authors.map(author => {
  //     return Author.create(author)
  //   })
  // )

  // await Promise.all(
  //   folders.map(folder => {
  //     return Folder.create(folder)
  //   })
  // )

  // await Promise.all(
  //   pictures.map(picture => {
  //     return Picture.create(picture)
  //   })
  // )

  ///////////////////////////////////
  // user
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
