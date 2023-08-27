import { message, notification } from 'antd'

export const alertPop = (type, data,title=null) => {
    // message[type](data, 6);
    notification[type]({
        placement : 'bottomRight',
        message: title||`${type[0].toUpperCase()}${type.slice(1)}`,
        description:
          data
      })
}