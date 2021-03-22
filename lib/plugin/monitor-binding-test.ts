import {assert} from 'chai';
import {describe, it} from 'mocha';

import {TestUtil} from '../misc/test-util';
import {BindingTarget} from './common/binding/target';
import {ValueController} from './common/controller/value';
import {stringFromUnknown} from './common/converter/string';
import {Buffer, BufferedValue} from './common/model/buffered-value';
import {View} from './common/view/view';
import {createController, MonitorBindingPlugin} from './monitor-binding';

class TestView implements View {
	public readonly element: HTMLElement;

	constructor(doc: Document) {
		this.element = doc.createElement('div');
	}
}

class TestController implements ValueController<Buffer<string>> {
	public readonly view: View;
	public disposed = false;

	constructor(doc: Document, public readonly value: BufferedValue<string>) {
		this.view = new TestView(doc);
	}

	onDispose() {
		this.disposed = true;
	}
}

describe(createController.name, () => {
	it('should be able to handle disposing from plugin', () => {
		const plugin: MonitorBindingPlugin<string> = {
			id: 'test',
			accept: (ex) => (typeof ex === 'string' ? ex : null),
			binding: {
				reader: (_) => stringFromUnknown,
			},
			controller: (args) => {
				return new TestController(args.document, args.value);
			},
		};

		const bc = createController(plugin, {
			document: TestUtil.createWindow().document,
			params: {},
			target: new BindingTarget({foo: 'bar'}, 'foo'),
		});
		assert.isFalse(
			bc?.controller instanceof TestController && bc.controller.disposed,
		);
		bc?.blade.dispose();
		assert.isTrue(
			bc?.controller instanceof TestController && bc.controller.disposed,
		);
	});
});
