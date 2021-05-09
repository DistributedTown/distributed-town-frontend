import { Buckets } from '@textile/hub'

const keyInfo = {
  key: process.env.NEXT_PUBLIC_TEXTILE_KEY,
  secret: process.env.NEXT_PUBLIC_TEXTILE_SECRET
}

export async function pushJSONDocument(json) {
  const buckets = await Buckets.withKeyInfo(keyInfo)
  const { root, threadID } = await buckets.getOrCreate(process.env.NEXT_PUBLIC_BUCKET_NAME)
  if (!root) throw new Error('bucket not created')
  const buf = Buffer.from(JSON.stringify(json, null, 2))
  const path = `metadata.json`
  const links = await buckets.pushPath(root.key, path, buf)
  return `https://hub.textile.io${links.path.path}`;
}

export async function pushImage(buf) {
  const buckets = await Buckets.withKeyInfo(keyInfo)
  const { root, threadID } = await buckets.getOrCreate(process.env.NEXT_PUBLIC_BUCKET_NAME)
  if (!root) throw new Error('bucket not created')
  const path = `projefile.png`
  const links = await buckets.pushPath(root.key, path, buf)
  return `https://hub.textile.io${links.path.path}`;
}
