import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Modal, Input, Form } from 'antd';
import i18n from 'i18next';

import Icon from '../icon/Icon';
import { Flex } from '../flex';

class EditTableClass extends Component {
	static propTypes = {
		userProperty: PropTypes.object,
		form: PropTypes.any,
		onChange: PropTypes.func,
	};

	static defaultProps = {
		userProperty: {},
	};

	state = {
		userProperty: this.props.userProperty,
		tempKey: '',
		originKey: '',
		tempValue: '',
		visible: false,
		current: 'add',
		validateStatus: '',
		help: '',
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			userProperty: nextProps.userProperty || {},
		});
	}

	getDataSource = userProperty => {
		return Object.keys(userProperty).map(key => {
			return {
				key,
				value: userProperty[key],
			};
		});
	};

	handlers = {
		onOk: () => {
			const { onChange } = this.props;
			const { tempKey, originKey, tempValue, current, validateStatus } = this.state;
			if (validateStatus === 'error') {
				return;
			}
			if (current === 'modify') {
				delete this.state.userProperty[originKey];
			}
			const userProperty = Object.assign({}, this.state.userProperty, { [tempKey]: tempValue });
			if (onChange) {
				onChange(userProperty);
			}
			this.setState({
				visible: false,
				userProperty,
			});
		},
		onCancel: () => {
			this.modalHandlers.onHide();
		},
		onChangeKey: value => {
			let validateStatus = 'success';
			let help = '';
			if (
				(this.state.current === 'add' && Object.keys(this.state.userProperty).some(p => p === value)) ||
				(this.state.current === 'modify' && this.state.originKey !== value && this.state.userProperty[value])
			) {
				validateStatus = 'error';
				help = i18n.t('validation.already-property', { arg: 'Key' });
			} else if (!value.length) {
				validateStatus = 'error';
				help = i18n.t('validation.enter-property', { arg: 'Key' });
			} else {
				validateStatus = 'success';
				help = '';
			}
			this.setState({
				tempKey: value,
				validateStatus,
				help,
			});
		},
	};

	modalHandlers = {
		onShow: () => {
			this.setState({
				visible: true,
			});
		},
		onHide: () => {
			this.setState({
				visible: false,
			});
		},
	};

	handleAdd = () => {
		this.setState({
			visible: true,
			tempKey: '',
			tempValue: '',
			current: 'add',
			validateStatus: '',
			help: '',
		});
	};

	handleEdit = key => {
		this.setState({
			visible: true,
			tempKey: key,
			originKey: key,
			tempValue: this.state.userProperty[key],
			current: 'modify',
			validateStatus: '',
			help: '',
		});
	};

	handleDelete = key => {
		delete this.state.userProperty[key];
		this.setState({ userProperty: this.state.userProperty });
	};

	handleClear = () => {
		this.setState({ userProperty: {} });
	};

	render() {
		const { userProperty, tempKey, tempValue, visible, validateStatus, help } = this.state;
		const { onOk, onCancel, onChangeKey } = this.handlers;
		const columns = [
			{
				title: 'Key',
				dataIndex: 'key',
			},
			{
				title: 'Value',
				dataIndex: 'value',
			},
			{
				title: '',
				dataIndex: 'action',
				render: (text, record) => {
					return (
						<div>
							<Button
								className="rde-action-btn"
								shape="circle"
								onClick={() => {
									this.handleEdit(record.key);
								}}
							>
								<Icon name="edit" />
							</Button>
							<Button
								className="rde-action-btn"
								shape="circle"
								onClick={() => {
									this.handleDelete(record.key);
								}}
							>
								<Icon name="times" />
							</Button>
						</div>
					);
				},
			},
		];
		return (
			<Flex flexDirection="column">
				<Flex justifyContent="flex-end">
					<Button className="rde-action-btn" shape="circle" onClick={this.handleAdd}>
						<Icon name="plus" />
					</Button>
					<Button className="rde-action-btn" shape="circle" onClick={this.handleClear}>
						<Icon name="times" />
					</Button>
				</Flex>
				<Table
					size="small"
					pagination={{
						pageSize: 5,
					}}
					columns={columns}
					dataSource={this.getDataSource(userProperty)}
				/>
				<Modal onCancel={onCancel} onOk={onOk} visible={visible}>
					<Form.Item
						required
						label={'Key'}
						colon={false}
						hasFeedback
						validateStatus={validateStatus}
						help={help}
					>
						<Input
							defaultValue={tempKey}
							value={tempKey}
							onChange={e => {
								onChangeKey(e.target.value);
							}}
						/>
					</Form.Item>
					<Form.Item label={'Value'} colon={false}>
						<Input
							defaultValue={tempValue}
							value={tempValue}
							onChange={e => {
								this.setState({ tempValue: e.target.value });
							}}
						/>
					</Form.Item>
				</Modal>
			</Flex>
		);
	}
}

const EditTable = ({ userProperty, form, onChange}) => {
	const [userPropertyState, setUserPropertyState] = useState(userProperty)
	const [tempKey, setTempKey] = useState('')
	const [originKey, setOriginKey] = useState('')
	const [tempValue, setTempValue] = useState('')
	const [visible, setVisible] = useState(false)
	const [current, setCurrent] = useState('add')
	const [validateStatus, setValidateStatus] = useState('')
	const [help, setHelp] = useState('')

	const getDataSource = userProperty => {
		return Object.keys(userProperty).map(key => {
			return {
				key,
				value: userProperty[key],
			};
		});
	};

	//modalHandlers
	const onShow = () => {
			setVisible(true)
	}

	const onHide = () => {
		setVisible(false)
	}

	//handlers
	const onOk = () => {
		if (validateStatus === 'error') {
			return;
		}
		if (current === 'modify') {
			delete userPropertyState[originKey];
		}
		const userProperty = Object.assign({}, userPropertyState, { [tempKey]: tempValue });
		if (onChange) {
			onChange(userProperty);
		}
			setVisible(false)
			setUserPropertyState(userProperty)
	}
	const onCancel = () => {
		onHide();
	}

	const onChangeKey = value => {
		let validateStatus = 'success';
		let help = '';
		if (
			(thiscurrent === 'add' && Object.keys(userPropertyState).some(p => p === value)) ||
			(current === 'modify' && originKey !== value && userPropertyState[value])
		) {
			validateStatus = 'error';
			help = i18n.t('validation.already-property', { arg: 'Key' });
		} else if (!value.length) {
			validateStatus = 'error';
			help = i18n.t('validation.enter-property', { arg: 'Key' });
		} else {
			validateStatus = 'success';
			help = '';
		}
			setTempKey(value)
			setValidateStatus(validateStatus)
			setHelp(help)
	}

	const handleAdd = () => {
			setVisible(true)
			setTempKey('')
			setTempValue('')
			setCurrent('add')
			setValidateStatus('')
			setHelp('')
	};

	const handleEdit = key => {
		setVisible(true)
		setTempKey(key)
		setOriginKey(key),
		setTempValue(userPropertyState[key])
		setCurrent('modify'),
		setCurrent('add')
		setValidateStatus('')
		setHelp('')
	};

	const handleDelete = key => {
		delete userPropertyState[key];
		setUserPropertyState(userPropertyState);
	};

	const handleClear = () => {
		setUserPropertyState({});
	};

	const columns = [
		{
			title: 'Key',
			dataIndex: 'key',
		},
		{
			title: 'Value',
			dataIndex: 'value',
		},
		{
			title: '',
			dataIndex: 'action',
			render: (text, record) => {
				return (
					<div>
						<Button
							className="rde-action-btn"
							shape="circle"
							onClick={() => {
								handleEdit(record.key);
							}}
						>
							<Icon name="edit" />
						</Button>
						<Button
							className="rde-action-btn"
							shape="circle"
							onClick={() => {
								handleDelete(record.key);
							}}
						>
							<Icon name="times" />
						</Button>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		setUserPropertyState(userProperty | {})

	}, [userProperty])

	return (
		<Flex flexDirection="column">
			<Flex justifyContent="flex-end">
				<Button className="rde-action-btn" shape="circle" onClick={handleAdd}>
					<Icon name="plus" />
				</Button>
				<Button className="rde-action-btn" shape="circle" onClick={handleClear}>
					<Icon name="times" />
				</Button>
			</Flex>
			<Table
				size="small"
				pagination={{
					pageSize: 5,
				}}
				columns={columns}
				dataSource={getDataSource(userProperty)}
			/>
			<Modal onCancel={onCancel} onOk={onOk} visible={visible}>
				<Form.Item
					required
					label={'Key'}
					colon={false}
					hasFeedback
					validateStatus={validateStatus}
					help={help}
				>
					<Input
						defaultValue={tempKey}
						value={tempKey}
						onChange={e => {
							onChangeKey(e.target.value);
						}}
					/>
				</Form.Item>
				<Form.Item label={'Value'} colon={false}>
					<Input
						defaultValue={tempValue}
						value={tempValue}
						onChange={e => {
							setTempValue(e.target.value);
						}}
					/>
				</Form.Item>
			</Modal>
		</Flex>
	);


}

export default EditTable;
