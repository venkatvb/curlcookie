import fs from 'fs'
import readLine from 'readline'

const parseBooleanString = input => {
  if (input === 'TRUE') {
    return true
  }
  if (input === 'FALSE') {
    return false
  }
  throw `un-known boolean string ${input}`
}

const cookieLineProcessor = line => {
  if (line.length === 0) {
    return null
  }
  if (line.length === 1 && line[0] === '#') {
    return null
  }
  if (line.length === 1) {
    throw `invalid case line in cookie - ${line}`
  }
  if (line[0] === '#' && line[1] === ' ') {
    return null
  }
  const splits = line.split('\t')
  if (splits.length !== 7) {
    throw `unexpected number of splits in line ${line}`
  }
  return {
    domain: splits[0],
    includesSubDomain: parseBooleanString(splits[1]),
    path: splits[2],
    sendAndReceiveOverHttpsOnly: parseBooleanString(splits[3]),
    expiresAt: parseInt(splits[4], 10),
    name: splits[5],
    value: splits[6]
  }
}

/**
 * Parses the cookie jar format specified by Netscape.
 *
 * @return {object} keys - name of cookie, value - object with other details
 */
export const getCookieJar = async path => {
  return new Promise(resolve => {
    const lineReader = readLine.createInterface({
      input: fs.createReadStream(path)
    })
    let cookies = {}
    lineReader.on('line', line => {
      const lineResult = cookieLineProcessor(line)
      if (lineResult === null) {
        return
      }
      cookies[lineResult.name] = lineResult
    })
    lineReader.on('close', () => {
      resolve(cookies)
    })
  })
}

export const transformToCookieString = async path => {
  const cookies = await getCookieJar(path)
  return Object.keys(cookies)
    .map(key => `${key}=${cookies[key].value};`)
    .join(' ')
}
