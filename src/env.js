
module.exports = {
  port: process.env.PORT || '8080',
  mongoUrl: process.env.MONGODB_URL || 'mongodb+srv://zemogatest:zemogapwd@zemoga-uchqd.mongodb.net',
  mongoDb: process.env.MONGODB_DB || 'zemoga',
  jwtSecret: process.env.JWT_SECRET || 'zemoga-test',
}
