import {ClassName} from '../../misc/class-name';
import * as DisposingUtil from '../../misc/disposing-util';
import {PaneError} from '../../misc/pane-error';
import {Value} from '../../model/value';
import {View, ViewConfig} from '../view';
import {ValueView} from './value';

interface Config extends ViewConfig {
	value: Value<boolean>;
}

const className = ClassName('ckb');

/**
 * @hidden
 */
export class CheckboxView extends View implements ValueView<boolean> {
	public readonly value: Value<boolean>;
	private inputElem_: HTMLInputElement | null;

	constructor(document: Document, config: Config) {
		super(document, config);

		this.onValueChange_ = this.onValueChange_.bind(this);

		this.element.classList.add(className());

		const labelElem = document.createElement('label');
		labelElem.classList.add(className('l'));
		this.element.appendChild(labelElem);

		const inputElem = document.createElement('input');
		inputElem.classList.add(className('i'));
		inputElem.type = 'checkbox';
		labelElem.appendChild(inputElem);
		this.inputElem_ = inputElem;

		const markElem = document.createElement('div');
		markElem.classList.add(className('m'));
		labelElem.appendChild(markElem);

		config.value.emitter.on('change', this.onValueChange_);
		this.value = config.value;

		this.update();

		config.model.emitter.on('dispose', () => {
			this.inputElem_ = DisposingUtil.disposeElement(this.inputElem_);
		});
	}

	get inputElement(): HTMLInputElement {
		if (!this.inputElem_) {
			throw PaneError.alreadyDisposed();
		}
		return this.inputElem_;
	}

	public update(): void {
		if (!this.inputElem_) {
			throw PaneError.alreadyDisposed();
		}
		this.inputElem_.checked = this.value.rawValue;
	}

	private onValueChange_(): void {
		this.update();
	}
}
