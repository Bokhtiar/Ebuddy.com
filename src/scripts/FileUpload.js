
import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Button, Icon, message, notification } from 'antd';
import { postData } from './postData';
import { Link } from 'react-router-dom' 

class FileUpload extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };

  handleUpload = async () => {
    const formData = new FormData();

    formData.append('file', this.state.fileList[0]);
    formData.append('reference_id', this.props.ref_id);
    formData.append('type', this.props.type);

    this.setState({
      uploading: true,
    });

    let res = await postData('files/v1/upload', formData)
    if (res.status === 200 || res.status === 201 ) {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('uploaded successfully.')
        this.props.view()
        this.props.fileModal()
    } else {
      this.setState({
          uploading: false,
        });
        message.error('upload failed.')
    }
  }

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button block>
            <Icon type="upload" /> 
            Select File
          </Button>
        </Upload>
        <Button
          block
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Upload'}
        </Button>
      </div>
    );
  }
}

export default FileUpload          