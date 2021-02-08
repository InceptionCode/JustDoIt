import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type IUser from '../../../common/Interfaces/IUser';

export const userData: Writable<IUser> = writable({ } as IUser)