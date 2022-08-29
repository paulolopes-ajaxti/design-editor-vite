import React, { Component, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import { Form } from '@ant-design/compatible'

import Canvas from '../../../canvas/Canvas';
import DataSourceProperty from '../properties/DataSourceProperty';
import { useCanvasRef } from '../../../../hooks/useCanvasRef';

class DataSourceModalClass extends Component {
	static propTypes = {
		form: PropTypes.any,
		visible: PropTypes.bool,
		animation: PropTypes.object,
		onOk: PropTypes.func,
		onCancel: PropTypes.func,
	};

	state = {
		width: 150,
		height: 150,
	};

	componentDidMount() {
		this.waitForContainerRender(this.containerRef);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		nextProps.form.resetFields();
	}

	waitForContainerRender = container => {
		setTimeout(() => {
			if (container) {
				this.setState({
					width: container.clientWidth,
					height: container.clientHeight,
				});
				return;
			}
			this.waitForContainerRender(this.containerRef);
		}, 5);
	};

	render() {
		const { form, visible, animation, onOk, onCancel, validateTitle, onChange } = this.props;
		const { width, height } = this.state;
		return (
			<Modal onOk={onOk} onCancel={onCancel} visible={visible}>
				<Form.Item
					label="Title"
					required
					colon={false}
					hasFeedback
					help={validateTitle.help}
					validateStatus={validateTitle.validateStatus}
				>
					<Input
						value={animation.title}
						onChange={e => {
							onChange(
								null,
								{ animation: { title: e.target.value } },
								{ animation: { ...animation, title: e.target.value } },
							);
						}}
					/>
				</Form.Item>
				{DataSourceProperty.render(this.canvasRef, form, { animation })}
				<div
					ref={c => {
						this.containerRef = c;
					}}
				>
					<Canvas ref={this.canvasRef} editable={false} width={width} height={height} />
				</div>
			</Modal>
		);
	}
}

const DataSourceModal = ({ form, visible, animation, onOk, onCancel }) => {
	const [width, setWidth] = useState(150)
	const [height, setHeight] = useState(150)

	const containerRef = useRef(null)
	const canvasRef = useCanvasRef()

	const waitForContainerRender = container => {
		setTimeout(() => {
			if (container) {
					setWidth(container?.clientWidth)
					setHeight(container?.clientHeight)
				return;
			}
			waitForContainerRender(containerRef);
		}, 5);
	};

	useEffect(() => {
		waitForContainerRender(containerRef)
	}, [])

	useEffect(() => {
		form.resetFields()
	}, [form, visible, animation, onOk, onCancel])

	return (
		<Modal onOk={onOk} onCancel={onCancel} visible={visible}>
			<Form.Item
				label="Title"
				required
				colon={false}
				hasFeedback
				help={validateTitle?.help}
				validateStatus={validateTitle.validateStatus}
			>
				<Input
					value={animation?.title}
					onChange={e => {
						onChange(
							null,
							{ animation: { title: e.target.value } },
							{ animation: { ...animation, title: e.target.value } },
						);
					}}
				/>
			</Form.Item>
			{DataSourceProperty.render(canvasRef, form, { animation })}
			<div
				ref={containerRef}
			>
				<Canvas ref={canvasRef} editable={false} width={width} height={height} />
			</div>
		</Modal>
	);

}

export default Form.create({
	onValuesChange: (props, changedValues, allValues) => {
		const { onChange } = props;
		onChange(props, changedValues, allValues);
	},
})(DataSourceModal);
