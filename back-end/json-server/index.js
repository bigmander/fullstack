const jsonServer = require('json-server')
const auth = require('json-server-auth')

const routes = require('./routes.json');

const server = jsonServer.create()
const router = jsonServer.router('db.json')

server.db = router.db;

const middlewares = jsonServer.defaults()

const rules = auth.rewriter(routes);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

server.use(rules);
server.use(auth)

// Use default router
server.use(router)


server.listen(3000, () => {
    console.log('JSON Server is running')
})