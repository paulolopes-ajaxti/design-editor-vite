import React, { useEffect, useState, memo, useMemo, useImperativeHandle } from 'react';
import { Collapse, notification, Input, message } from 'antd';
import classnames from 'classnames';

import { Flex } from '../../components/flex';
import Icon from '../../components/icon/Icon';
import Scrollbar from '../../components/common/Scrollbar';
import CommonButton from '../../components/common/CommonButton';
import { nanoid } from 'nanoid';

notification.config({
	top: 80,
	duration: 2,
});

/* class ImageMapItemsClass extends Component {
	static propTypes = {
		canvasRef: PropTypes.any,
		descriptors: PropTypes.object,
	};

	state = {
		activeKey: [],
		collapse: false,
		textSearch: '',
		descriptors: {},
		filteredDescriptors: [],
		svgModalVisible: false,
	};

	componentDidMount() {
		const { canvasRef } = this.props;
		this.waitForCanvasRender(canvasRef);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (JSON.stringify(this.props.descriptors) !== JSON.stringify(nextProps.descriptors)) {
			const descriptors = Object.keys(nextProps.descriptors).reduce((prev, key) => {
				return prev.concat(nextProps.descriptors[key]);
			}, []);
			this.setState({
				descriptors,
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (JSON.stringify(this.state.descriptors) !== JSON.stringify(nextState.descriptors)) {
			return true;
		} else if (JSON.stringify(this.state.filteredDescriptors) !== JSON.stringify(nextState.filteredDescriptors)) {
			return true;
		} else if (this.state.textSearch !== nextState.textSearch) {
			return true;
		} else if (JSON.stringify(this.state.activeKey) !== JSON.stringify(nextState.activeKey)) {
			return true;
		} else if (this.state.collapse !== nextState.collapse) {
			return true;
		} else if (this.state.svgModalVisible !== nextState.svgModalVisible) {
			return true;
		}
		return false;
	}

	componentWillUnmount() {
		const { canvasRef } = this.props;
		this.detachEventListener(canvasRef);
	}

	waitForCanvasRender = canvas => {
		setTimeout(() => {
			if (canvas) {
				this.attachEventListener(canvas);
				return;
			}
			const { canvasRef } = this.props;
			this.waitForCanvasRender(canvasRef);
		}, 5);
	};

	attachEventListener = canvas => {
		canvas.canvas.wrapperEl.addEventListener('dragenter', this.events.onDragEnter, false);
		canvas.canvas.wrapperEl.addEventListener('dragover', this.events.onDragOver, false);
		canvas.canvas.wrapperEl.addEventListener('dragleave', this.events.onDragLeave, false);
		canvas.canvas.wrapperEl.addEventListener('drop', this.events.onDrop, false);
	};

	detachEventListener = canvas => {
		canvas.canvas.wrapperEl.removeEventListener('dragenter', this.events.onDragEnter);
		canvas.canvas.wrapperEl.removeEventListener('dragover', this.events.onDragOver);
		canvas.canvas.wrapperEl.removeEventListener('dragleave', this.events.onDragLeave);
		canvas.canvas.wrapperEl.removeEventListener('drop', this.events.onDrop);
	};

	handlers = {
		onAddItem: (item, centered) => {
			const { canvasRef } = this.props;
			if (canvasRef.handler.interactionMode === 'polygon') {
				message.info('Already drawing');
				return;
			}
			const id = nanoid();
			const option = Object.assign({}, item.option, { id });
			if (item.option.superType === 'svg' && item.type === 'default') {
				this.handlers.onSVGModalVisible(item.option);
				return;
			}
			canvasRef.handler.add(option, centered);
		},
		onAddSVG: (option, centered) => {
			const { canvasRef } = this.props;
			canvasRef.handler.add({ ...option, type: 'svg', superType: 'svg', id: nanoid(), name: 'New SVG' }, centered);
			this.handlers.onSVGModalVisible();
		},
		onDrawingItem: item => {
			const { canvasRef } = this.props;
			if (canvasRef.handler.interactionMode === 'polygon') {
				message.info('Already drawing');
				return;
			}
			if (item.option.type === 'line') {
				canvasRef.handler.drawingHandler.line.init();
			} else if (item.option.type === 'arrow') {
				canvasRef.handler.drawingHandler.arrow.init();
			} else {
				canvasRef.handler.drawingHandler.polygon.init();
			}
		},
		onChangeActiveKey: activeKey => {
			this.setState({
				activeKey,
			});
		},
		onCollapse: () => {
			this.setState({
				collapse: !this.state.collapse,
			});
		},
		onSearchNode: e => {
			const filteredDescriptors = this.handlers
				.transformList()
				.filter(descriptor => descriptor.name.toLowerCase().includes(e.target.value.toLowerCase()));
			this.setState({
				textSearch: e.target.value,
				filteredDescriptors,
			});
		},
		transformList: () => {
			return Object.values(this.props.descriptors).reduce((prev, curr) => prev.concat(curr), []);
		},
		onSVGModalVisible: () => {
			this.setState(prevState => {
				return {
					svgModalVisible: !prevState.svgModalVisible,
				};
			});
		},
	};

	events = {
		onDragStart: (e, item) => {
			this.item = item;
			const { target } = e;
			target.classList.add('dragging');
		},
		onDragOver: e => {
			if (e.preventDefault) {
				e.preventDefault();
			}
			e.dataTransfer.dropEffect = 'copy';
			return false;
		},
		onDragEnter: e => {
			const { target } = e;
			target.classList.add('over');
		},
		onDragLeave: e => {
			const { target } = e;
			target.classList.remove('over');
		},
		onDrop: e => {
			e = e || window.event;
			if (e.preventDefault) {
				e.preventDefault();
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			const { layerX, layerY } = e;
			const dt = e.dataTransfer;
			if (dt.types.length && dt.types[0] === 'Files') {
				const { files } = dt;
				Array.from(files).forEach(file => {
					file.uid = nanoid();
					const { type } = file;
					if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
						const item = {
							option: {
								type: 'image',
								file,
								left: layerX,
								top: layerY,
							},
						};
						this.handlers.onAddItem(item, false);
					} else {
						notification.warn({
							message: 'Not supported file type',
						});
					}
				});
				return false;
			}
			const option = Object.assign({}, this.item.option, { left: layerX, top: layerY });
			const newItem = Object.assign({}, this.item, { option });
			this.handlers.onAddItem(newItem, false);
			return false;
		},
		onDragEnd: e => {
			this.item = null;
			e.target.classList.remove('dragging');
		},
	};

	renderItems = items => (
		<Flex flexWrap="wrap" flexDirection="column" style={{ width: '100%' }}>
			{items?.map(item => this.renderItem(item))}
		</Flex>
	);

	renderItem = (item, centered) =>
		item.type === 'drawing' ? (
			<div
				key={item.name}
				draggable
				onClick={e => this.handlers.onDrawingItem(item)}
				className="rde-editor-items-item"
				style={{ justifyContent: this.state.collapse ? 'center' : null }}
			>
				<span className="rde-editor-items-item-icon">
					<Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
				</span>
				{this.state.collapse ? null : <div className="rde-editor-items-item-text">{item.name}</div>}
			</div>
		) : (
			<div
				key={item.name}
				draggable
				onClick={e => this.handlers.onAddItem(item, centered)}
				onDragStart={e => this.events.onDragStart(e, item)}
				onDragEnd={e => this.events.onDragEnd(e, item)}
				className="rde-editor-items-item"
				style={{ justifyContent: this.state.collapse ? 'center' : null }}
			>
				<span className="rde-editor-items-item-icon">
					<Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
				</span>
				{this.state.collapse ? null : <div className="rde-editor-items-item-text">{item.name}</div>}
			</div>
		);

	render() {
		const { descriptors } = this.props;
		const { collapse, textSearch, filteredDescriptors, activeKey, svgModalVisible, svgOption } = this.state;
		const className = classnames('rde-editor-items', {
			minimize: collapse,
		});
		return (
			<div className={className}>
				<Flex flex="1" flexDirection="column" style={{ height: '100%' }}>
					<Flex justifyContent="center" alignItems="center" style={{ height: 40 }}>
						<CommonButton
							icon={collapse ? 'angle-double-right' : 'angle-double-left'}
							shape="circle"
							className="rde-action-btn"
							style={{ margin: '0 4px' }}
							onClick={this.handlers.onCollapse}
						/>
						{collapse ? null : (
							<Input
								style={{ margin: '8px' }}
								placeholder={i18n.t('action.search-list')}
								onChange={this.handlers.onSearchNode}
								value={textSearch}
								allowClear
							/>
						)}
					</Flex>
					<Scrollbar>
						<Flex flex="1" style={{ overflowY: 'hidden' }}>
							{(textSearch.length && this.renderItems(filteredDescriptors)) ||
								(collapse ? (
									<Flex
										flexWrap="wrap"
										flexDirection="column"
										style={{ width: '100%' }}
										justifyContent="center"
									>
										{this.handlers.transformList().map(item => this.renderItem(item))}
									</Flex>
								) : (
									<Collapse
										style={{ width: '100%' }}
										bordered={false}
										activeKey={activeKey.length ? activeKey : Object.keys(descriptors)}
										onChange={this.handlers.onChangeActiveKey}
									>
										{Object.keys(descriptors).map(key => (
											<Collapse.Panel key={key} header={key} showArrow={!collapse}>
												{this.renderItems(descriptors[key])}
											</Collapse.Panel>
										))}
									</Collapse>
								))}
						</Flex>
					</Scrollbar>
				</Flex>
				<SVGModal
					visible={svgModalVisible}
					onOk={this.handlers.onAddSVG}
					onCancel={this.handlers.onSVGModalVisible}
					option={svgOption}
				/>
			</div>
		);
	}
} */

const ImageMapItems = React.forwardRef(( props , itemRef) => {
	const [activeKey, setActiveKey] = useState([])
	const [collapse, setCollapse] = useState(false)
	const [textSearch, setTextSearch] = useState('')
	const [descriptorsState, setDescriptorsState] = useState({})
	const [filteredDescriptors, setFilteredDescriptors] = useState([])

	const onAddItem = (item, centered) => {
		if (props.canvasRef?.current?.handler?.interactionMode === 'polygon') {
			message.info('Already drawing');
			return;
		}
		const id = nanoid();
		const option = Object.assign({}, item.option, { id });

		if (item.option.superType === 'svg' && item.type === 'default') {
			onSVGModalVisible(item.option);
			return;
		}
		props.canvasRef?.current?.handler?.add(option, centered);
	}


	const onDrawingItem = (item) => {
		if (props.canvasRef?.current?.handler?.interactionMode === 'polygon') {
			message.info('Already drawing');
			return;
		}
		if (item.option.type === 'line') {
			props.canvasRef?.current?.handler?.drawingHandler?.line.init();
		} else if (item.option.type === 'arrow') {
			props.canvasRef?.current?.handler?.drawingHandler?.arrow.init();
		} else {
			props.canvasRef?.current?.handler?.drawingHandler?.polygon.init();
		}
	}

	const onChangeActiveKey = (activeKey) => {
		setActiveKey(activeKey);
	}

	const onCollapse = () => {
		setCollapse(!collapse)
	}

	const transformList = () => {
		return Object.values(props.descriptors).reduce((prev, curr) => prev.concat(curr), []);
	}

	const onSearchNode = e => {
		const filteredDescriptor = transformList()
			.filter(descriptor => descriptor.name.toLowerCase().includes(e.target.value.toLowerCase()));
			setTextSearch(e.target.value)
			setFilteredDescriptors(filteredDescriptor)
	}

	const onDragStart = (e, item) => {
		const { target } = e;
		target.classList.add('dragging');
	}

	const onDragOver = (e) => {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'copy';
		return false;
	}

	const onDragEnter = (e) => {
		const { target } = e;
		target.classList.add('over');
	}

	const onDragLeave = (e) => {
		const { target } = e;
		target.classList.remove('over');
	}
	
	const onDrop = (e, item) => {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		const { layerX, layerY } = e;
		const dt = e.dataTransfer;
		if (dt.types.length && dt.types[0] === 'Files') {
			const { files } = dt;
			Array.from(files).forEach(file => {
				file.uid = nanoid();
				const { type } = file;
				if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
					const item = {
						option: {
							type: 'image',
							file,
							left: layerX,
							top: layerY,
						},
					};
					onAddItem(item, false);
				} else {
					notification.warn({
						message: 'Not supported file type',
					});
				}
			});
			return false;
		}
		const option = Object.assign({}, item.option, { left: layerX, top: layerY });
		const newItem = Object.assign({}, item, { option });
		onAddItem(newItem, false);
		return false;
	}
	
	const onDragEnd = (e) => {
		e.target.classList.remove('dragging');
	}

	const attachEventListener = (canvasCurrent) => {
		console.log(canvasCurrent, 'attach')
		canvasCurrent?.current?.canvas?.wrapperEl?.addEventListener('dragenter', onDragEnter, false);
		canvasCurrent?.current?.canvas?.wrapperEl?.addEventListener('dragover', onDragOver, false);
		canvasCurrent?.current?.canvas?.wrapperEl?.addEventListener('dragleave', onDragLeave, false);
		canvasCurrent?.current?.canvas?.wrapperEl?.addEventListener('drop', onDrop, false);
	};

	const detachEventListener = (canvasCurrent) => {
		console.log(canvasCurrent, 'detach')
		canvasCurrent?.current?.canvas?.wrapperEl?.removeEventListener('dragenter', onDragEnter);
		canvasCurrent?.current?.canvas?.wrapperEl?.removeEventListener('dragover', onDragOver);
		canvasCurrent?.current?.canvas?.wrapperEl?.removeEventListener('dragleave', onDragLeave);
		canvasCurrent?.current?.canvas?.wrapperEl?.removeEventListener('drop', onDrop);
	};

	const waitForCanvasRender = (canvas) => {
		setTimeout(() => {
			if (canvas) {
				attachEventListener(canvas);
				return;
			}
			waitForCanvasRender(props.canvasRef);
		}, 5);
	};

	useImperativeHandle(itemRef, () => {
		renderItem: (item, centered) =>
		item.type === 'drawing' ? (
			<div
				key={item.name}
				draggable
				onClick={e => onDrawingItem(item)}
				className="rde-editor-items-item"
				style={{ justifyContent: collapse ? 'center' : null }}
			>
				<span className="rde-editor-items-item-icon">
					<Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
				</span>
				{collapse ? null : <div className="rde-editor-items-item-text">{item.name}</div>}
			</div>
		) : (
			<div
				key={item.name}
				draggable
				onClick={e => onAddItem(item, centered)}
				onDragStart={e => onDragStart(e, item)}
				onDragEnd={e => onDragEnd(e, item)}
				className="rde-editor-items-item"
				style={{ justifyContent: collapse ? 'center' : null }}
			>
				<span className="rde-editor-items-item-icon">
					<Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
				</span>
				{collapse ? null : <div className="rde-editor-items-item-text">{item.name}</div>}
			</div>
		);
	})
	
	const renderItem = (item, centered) =>
		item.type === 'drawing' ? (
			<div
				key={item.name}
				draggable
				onClick={e => onDrawingItem(item)}
				className="rde-editor-items-item"
				style={{ justifyContent: collapse ? 'center' : null }}
			>
				<span className="rde-editor-items-item-icon">
					<Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
				</span>
				{collapse ? null : <div className="rde-editor-items-item-text">{item.name}</div>}
			</div>
		) : (
			<div
				key={item.name}
				draggable
				onClick={e => onAddItem(item, centered)}
				onDragStart={e => onDragStart(e, item)}
				onDragEnd={e => onDragEnd(e, item)}
				className="rde-editor-items-item"
				style={{ justifyContent: collapse ? 'center' : null }}
			>
				<span className="rde-editor-items-item-icon">
					<Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
				</span>
				{collapse ? null : <div className="rde-editor-items-item-text">{item.name}</div>}
			</div>
		);

	const renderItems = (items) => (
		<Flex flexWrap="wrap" flexDirection="column" style={{ width: '100%' }}>
			{console.log(items, 'items')}
			{items?.map(item => renderItem(item))}
		</Flex>
	);

	useEffect(() => {
		waitForCanvasRender(props.canvasRef)
		return () => {
			detachEventListener(props.canvasRef)
		}
	}, []);

/* 	useEffect(() => {
		const descript = Object.keys(descriptors).reduce((prev, key) => {
			return prev.concat(descriptors[key]);
		}, [])

		setDescriptorsState(descript)

	}, [descriptors]) */

	useMemo(() => {
		const descript = Object.keys(props.descriptors).reduce((prev, key) => {
			return prev.concat(props.descriptors[key]);
		}, [])
		setDescriptorsState(descript)
	},[props]);

	const className = classnames('rde-editor-items', {
		minimize: collapse,
	});

	return (
		<div className={className}>
			<Flex flex="1" flexDirection="column" style={{ height: '100%' }}>
				<Flex justifyContent="center" alignItems="center" style={{ height: 40 }}>
					<CommonButton
						icon={collapse ? 'angle-double-right' : 'angle-double-left'}
						shape="circle"
						className="rde-action-btn"
						style={{ margin: '0 4px' }}
						onClick={onCollapse}
					/>
					{collapse ? null : (
						<Input
							style={{ margin: '8px' }}
							placeholder={'Search'}
							onChange={onSearchNode}
							value={textSearch}
							allowClear
						/>
					)}
				</Flex>
				<Scrollbar>
					<Flex flex="1" style={{ overflowY: 'hidden' }}>
						{(textSearch.length && renderItems(filteredDescriptors)) ||
							(collapse ? (
								<Flex
									flexWrap="wrap"
									flexDirection="column"
									style={{ width: '100%' }}
									justifyContent="center"
								>
									{transformList().map(item => renderItem(item))}
								</Flex>
							) : (
								<Collapse
									style={{ width: '100%' }}
									bordered={false}
									activeKey={activeKey.length ? activeKey : Object.keys(props.descriptors)}
									onChange={onChangeActiveKey}
								>
									{Object.keys(props.descriptors).map(key => (
										<Collapse.Panel key={key} header={key} showArrow={!collapse}>
											{renderItems(props.descriptors[key])}
										</Collapse.Panel>
									))}
								</Collapse>
							))}
					</Flex>
				</Scrollbar>
			</Flex>
		</div>
	);

})

export default ImageMapItems;
