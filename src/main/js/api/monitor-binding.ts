import {MonitorBindingController} from '../controller/monitor-binding';
import {Handler} from '../misc/emitter';
import * as HandlerAdapters from './handler-Adapters';

type EventName = 'update';

/**
 * The API for the monitor binding between the parameter and the pane.
 */
export class MonitorBindingApi<In> {
	/**
	 * @hidden
	 */
	public readonly controller: MonitorBindingController<In>;

	/**
	 * @hidden
	 */
	constructor(bindingController: MonitorBindingController<In>) {
		this.controller = bindingController;
	}

	public dispose(): void {
		this.controller.controller.disposable.dispose();
	}

	public on(eventName: EventName, handler: Handler): MonitorBindingApi<In> {
		const emitter = this.controller.binding.value.emitter;
		emitter.on(eventName, HandlerAdapters.value(handler));
		return this;
	}

	public refresh(): void {
		this.controller.binding.read();
	}
}
