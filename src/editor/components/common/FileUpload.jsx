import React, { Component, useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload;

/* class FileUploadClass extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		limit: PropTypes.number,
		accept: PropTypes.string,
	};

	static defaultProps = {
		limit: 5,
	};

	state = {
		fileList: this.props.value ? [this.props.value] : [],
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setState({
			fileList: nextProps.value ? [nextProps.value] : [],
		});
	}

	render() {
		const { accept, limit } = this.props;
		const { fileList } = this.state;
		const props = {
			accept,
			name: 'file',
			multiple: false,
			onChange: info => {
				const isLimit = info.file.size / 1024 / 1024 < limit;
				if (!isLimit) {
					message.error(`Limited to ${limit}MB or less`);
					return false;
				}
				const { onChange } = this.props;
				onChange(info.file);
			},
			onRemove: file => {
				this.setState(
					({ fileList }) => {
						const index = fileList.indexOf(file);
						const newFileList = fileList.slice();
						newFileList.splice(index, 1);
						return {
							fileList: newFileList,
						};
					},
					() => {
						const { onChange } = this.props;
						onChange(null);
					},
				);
			},
			beforeUpload: file => {
				const isLimit = file.size / 1024 / 1024 < limit;
				if (!isLimit) {
					return false;
				}
				this.setState({
					fileList: [file],
				});
				return false;
			},
			fileList,
		};
		return (
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">{`Support for a single upload. Limited to ${limit}MB or less`}</p>
			</Dragger>
		);
	}
} */

const FileUpload = ({ onChange, limit, accept, value }) => {

	let valorState = value ? value : []
	const [fileList, setFileList] = useState(valorState)

	const props = {
		accept,
		name: 'file',
		multiple: false,
		onChange: info => {
			const isLimit = info.file.size / 1024 / 1024 < limit;
			if (!isLimit) {
				message.error(`Limited to ${limit}MB or less`);
				return false;
			}
			onChange(info.file);
		},
		onRemove: file => {
			setFileList( fileList  => {
					const index = fileList.indexOf(file);
					const newFileList = fileList.slice();
					newFileList.splice(index, 1);
					return {
						fileList: newFileList,
					};
				},
				() => {
					onChange(null);
				},
			);
		},
		beforeUpload: file => {
			const isLimit = file.size / 1024 / 1024 < limit;
			if (!isLimit) {
				return false;
			}
			setFileList([file]);
			return false;
		},
		fileList,
	};

	return (
		<Dragger {...props}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">Click or drag file to this area to upload</p>
			<p className="ant-upload-hint">{`Support for a single upload. Limited to ${limit}MB or less`}</p>
		</Dragger>
	);
}

export default memo(FileUpload);
