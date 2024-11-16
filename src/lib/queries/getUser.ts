import { db } from '$lib/firebaseconfig';
import type { TUser } from '$lib/Types';
import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';

const getUser = async (uid: string): Promise<TUser> => {
	const userRef = doc(db, 'users', uid);

	const userSnap = await getDoc(userRef);

	if (userSnap.exists()) {
		return userSnap.data() as TUser;
	} else {
		throw error(404, 'user was not found');
	}
};

export default getUser;