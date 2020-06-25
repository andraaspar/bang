import { IAction } from './IAction'

export interface IResolveAction {
	(action?: IAction): void
}
