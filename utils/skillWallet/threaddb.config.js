import { Client, createUserAuth, PrivateKey, ThreadID } from '@textile/hub'

const skillWalletCollection = 'SkillWallet'
const skillWalletThreadIDString = process.env.NEXT_PUBLIC_TEXTILE_THREAD_ID

const keyInfo = {
	key: process.env.NEXT_PUBLIC_TEXTILE_KEY,
	secret: process.env.NEXT_PUBLIC_TEXTILE_SECRET
}

const skillWalletThreadID = ThreadID.fromString('bafk42lwogxbt7moa7p7gdclynpvm3h7bnfnk56nzawnkftxdlkzmpri');
const skillWalletPrivateKey = process.env.NEXT_PUBLIC_TEXTILE_PRIV_KEY

export async function initialize() {

	const userAuth = await auth(keyInfo);
	const client = Client.withUserAuth(userAuth);

	const identity = await PrivateKey.fromString(skillWalletPrivateKey);
	await client.getToken(identity)

	console.log('updated');
	try {
		console.log('collection exists');
		await client.getCollectionInfo(skillWalletThreadID, skillWalletCollection);
	} catch (err) {
		console.log('creating collection');
		await client.newCollection(skillWalletThreadID, { name: skillWalletCollection, schema: DiToSkillWalletSchema });
	}
}

export async function getSkillWalletByID(id) {
	const userAuth = await auth(keyInfo);
	const client = Client.withUserAuth(userAuth);
	const identity = await PrivateKey.fromString(skillWalletPrivateKey);
	await client.getToken(identity)

	return await client.findByID(skillWalletThreadID, skillWalletCollection, id);
}

export async function storeSkillWallet(model) {
	const userAuth = await auth(keyInfo);
	const client = Client.withUserAuth(userAuth);
	const identity = await PrivateKey.fromString(skillWalletPrivateKey);
	await client.getToken(identity)

	return await client.create(skillWalletThreadID, skillWalletCollection, [model]);
}

async function auth(keyInfo) {
	// Create an expiration and create a signature. 60s or less is recommended.
	const expiration = new Date(Date.now() + 60 * 1000)
	// Generate a new UserAuth
	const userAuth = await createUserAuth(keyInfo.key, keyInfo.secret ?? '', expiration)
	return userAuth
}

const DiToSkillWalletSchema = {
	"definitions": {},
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "https://example.com/object1610669989.json",
	"title": "Root",
	"type": "object",
	"required": [
		"skillWallet"
	],
	"properties": {
		_id: { type: 'string' },
		communityID: { type: 'string' },
		skillWallet: {
			"$id": "#root/skillWallet",
			"title": "Skillwallet",
			"type": "array",
			"default": [],
			"items": {
				"$id": "#root/skillWallet/items",
				"title": "Items",
				"type": "object",
				"required": [
					"skill",
					"level"
				],
				"properties": {
					"skill": {
						"$id": "#root/skillWallet/items/skill",
						"title": "Skill",
						"type": "string",
						"default": "",
						"examples": [
							"asd"
						],
						"pattern": "^.*$"
					},
					"level": {
						"$id": "#root/skillWallet/items/level",
						"title": "Level",
						"type": "integer",
						"examples": [
							2
						],
						"default": 0
					}
				}
			}

		}
	}
}
