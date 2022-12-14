import React from 'react';
import { Form, Radio } from 'antd';
import i18n from 'i18next';

import UrlModal from '../../../components/common/UrlModal';
import FileUpload from '../../../components/common/FileUpload';

export default {
	render(canvasRef, form, data) {
		const { getFieldDecorator } = form;
		if (!data) {
			return null;
		}
		const imageLoadType = data.imageLoadType || 'file';
		return (
			<React.Fragment>
				<Form.Item label={i18n.t('imagemap.image.image-load-type')} colon={false}>
					{getFieldDecorator('imageLoadType', {
						initialValue: imageLoadType,
					})(
						<Radio.Group size="small">
							<Radio.Button value="file">{'File Upload'}</Radio.Button>
							<Radio.Button value="src">{'Image'}</Radio.Button>
						</Radio.Group>,
					)}
				</Form.Item>
				{imageLoadType === 'file' ? (
					<Form.Item label={'File'} colon={false}>
						{getFieldDecorator('file', {
							rules: [
								{
									required: true,
									message: i18n.t('validation.enter-property', { arg: 'File' }),
								},
							],
							initialValue: data.file,
						})(<FileUpload accept="image/*" />)}
					</Form.Item>
				) : (
					<Form.Item>
						{getFieldDecorator('src', {
							initialValue: data.src,
						})(<UrlModal form={form} />)}
					</Form.Item>
				)}
			</React.Fragment>
		);
	},
};
