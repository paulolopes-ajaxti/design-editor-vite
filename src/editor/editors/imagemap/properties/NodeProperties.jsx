import React, { Component, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Collapse, List, Form } from 'antd';

import PropertyDefinition from './PropertyDefinition';
import Scrollbar from '../../../components/common/Scrollbar';
import { Flex } from '../../../components/flex';

const { Panel } = Collapse;

/* class NodePropertiesClass extends Component {
	static propTypes = {
		canvasRef: PropTypes.any,
		selectedItem: PropTypes.object,
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.props.selectedItem && nextProps.selectedItem) {
			if (this.props.selectedItem.id !== nextProps.selectedItem.id) {
				nextProps.form.resetFields();
			}
		}
	}

	render() {
		const { canvasRef, selectedItem, form } = this.props;
		const showArrow = false;
		return (
			<Scrollbar>
				<Form layout="horizontal" colon={false}>
					<Collapse bordered={false}>
						{selectedItem && PropertyDefinition[selectedItem.type] ? (
							Object.keys(PropertyDefinition[selectedItem.type]).map(key => {
								return (
									<Panel
										key={key}
										header={PropertyDefinition[selectedItem.type][key].title}
										showArrow={showArrow}
									>
										{PropertyDefinition[selectedItem.type][key].component.render(
											canvasRef,
											form,
											selectedItem,
										)}
									</Panel>
								);
							})
						) : (
							<Flex
								justifyContent="center"
								alignItems="center"
								style={{
									width: '100%',
									height: '100%',
									color: 'rgba(0, 0, 0, 0.45)',
									fontSie: 16,
									padding: 16,
								}}
							>
								<List />
							</Flex>
						)}
					</Collapse>
				</Form>
			</Scrollbar>
		);
	}
}
 */

const NodeProperties = ({ selectedItem, canvasRef, onChange}) => {
	const [form] = Form.useForm();
	const showArrow = false;

	useMemo(() => {
			form.resetFields();
	}, [selectedItem])

	return (
		<Scrollbar>
			<Form layout="horizontal" colon={false} onValuesChange={(changedValues, values) => onChange(selectedItem, changedValues, values)}>
				<Collapse bordered={false}>
					{selectedItem && PropertyDefinition[selectedItem.type] ? (
						Object.keys(PropertyDefinition[selectedItem.type]).map(key => {
							return (
								<Panel
									key={key}
									header={PropertyDefinition[selectedItem.type][key].title}
									showArrow={showArrow}
								>
									{PropertyDefinition[selectedItem.type][key].component.render(
										canvasRef,
										selectedItem,
									)}
								</Panel>
							);
						})
					) : (
						<Flex
							justifyContent="center"
							alignItems="center"
							style={{
								width: '100%',
								height: '100%',
								color: 'rgba(0, 0, 0, 0.45)',
								fontSie: 16,
								padding: 16,
							}}
						>
							<List />
						</Flex>
					)}
				</Collapse>
			</Form>
		</Scrollbar>
	);

}

export default NodeProperties;
