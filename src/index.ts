function wait(ms: number) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      return reject(new Error('Erro: tempo negativo não é permitido'))
    }
    setTimeout(resolve, ms)
  })
}

async function to<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const result = await promise
    return [null, result]
  } catch (err) {
    return [err as Error, null]
  }}

async function testError() {
  const [err, data] = await to(wait(-1000)) // -1000 vai gerar erro

  if (err) console.error('Erro capturado:', err.message)
  else console.log('Sucesso:', data)
}

testError()

async function demoParallel() {
  console.time('paralelo')
  await Promise.all([wait(1000), wait(1000)])
  console.timeEnd('paralelo')
}

async function demoSequential() {
  console.time('sequencial')
  await wait(1000)
  await wait(1000)
  console.timeEnd('sequencial')
}

demoParallel().then(() => demoSequential())

//com o to separa o erro evitnado o try catch por causa que teria que ter varios try/catch olha o exemplo abaixo com get

/*
async function main() {
  const [errUser, user] = await to(getUser())
  if (errUser) return console.error('Erro ao buscar usuário:', errUser.message)

  const [errPosts, posts] = await to(getPosts(user.id))
  if (errPosts) return console.error('Erro ao buscar posts:', errPosts.message)

  const [errComments, comments] = await to(getComments(posts[0].id))
  if (errComments) return console.error('Erro ao buscar comentários:', errComments.message)

  console.log('Tudo certo!')
}

*/
