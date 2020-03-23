import { transformToCookieString } from './src/index.js'

const MIDWAY_COOKIE_PATH = '/Users/venkaar/.midway/cookie'

transformToCookieString(MIDWAY_COOKIE_PATH).then(console.log)
