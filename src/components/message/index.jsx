import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.sass';
import Icon from "../icon";

Message.propTypes = {
    /**
     * 消息
     */
    message: PropTypes.string,
    /**
     * 类型
     */
    type: PropTypes.oneOf(['success', 'error', 'info'])
};

const messageIconMap = {
    success: <Icon type={'checkbox-circle-fill'}/>,
    error: <Icon type={'error-warning-fill'}/>,
    info: <Icon type={'information-fill'}/>
}

/**
 *
 * 消息提醒
 * 具体用法请看示例代码
 *
 */
function Message({message, type, closed}) {
    const iconClassName = classNames('bxer-message__icon', `bxer-message__icon-${type}`);
    const messageClassName = classNames('bxer-message', {
        'bxer-message-open': !closed,
        'bxer-message-close': closed,
    });
    console.log(message)
    return (
        <div className={messageClassName}>
            <span className={iconClassName}>
                {messageIconMap[type]}
            </span>
            <span className={'bxer-message__content'}>
                {message}
            </span>
        </div>
    );
}


let render = (props) => {
    const messageWrapper = document.createElement('div');
    document.body.appendChild(messageWrapper)
    const messageQueue = [];
    let isOpen = false;

    const task = (props, flag) => {
        const {duration = 500, ...otherProps} = props;
        isOpen = true;

        // 打开
        ReactDOM.render(<Message {...otherProps}/>, messageWrapper);

        setTimeout(() => {
            // 关闭
            ReactDOM.render(<Message closed {...otherProps}/>, messageWrapper);
            setTimeout(() => {
                // 下一个任务
                let head = messageQueue.shift();
                if (flag) {
                    head = messageQueue.shift();
                }
                isOpen = false;

                head && render(head);
            }, duration)
        }, duration);
    }

    render = (nextProps) => {
        if (isOpen) {
            return messageQueue.push(nextProps);
        }

        task(nextProps);

    };


    render(props);
};

/**
 * 消息提醒
 * @type {{success: message.success, error: message.error, info: message.info}}
 */
export const message = {
    success: (message,duration) => {
        render({
            message: message,
            type: 'success',duration
        })
    },
    info: (message,duration) => {
        render({
            message: message,
            type: 'info',duration
        })
    },
    error: (message,duration) => {
        render({
            message: message,
            type: 'error',duration
        })
    }
}

export default Message;
