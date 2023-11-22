import { createTreeMockData } from "./Components/Tree/mockData"

export async function getAccessList() {
	return [
		{ label: 'ارسال نامه', id: '1' , value:"send-letter" },
		{ label: 'ویرایش نامه', id: '2',value:"edit-letter" },
		{ label: 'مشاهده نامه', id: '3',value:"read-letter" },
	]
}

export async function getNodes() {
	return createTreeMockData()
}

export async function getUsers() {
	return [
		{ label: 'superadmin', value: 'superadmin' },
		{ label: 'admin', value: 'admin' },
		{ label: 'alireza', value: 'alireza' },
		{ label: 'alirezatest', value: 'alirezatest' },

	]
}