import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import Popover from "../popover";
import Icon from "../icon";
import classNames from 'classnames';
import './index.sass'
import Calendar from "./calendar";

DatePicker.propTypes = {
    onChange:PropTypes.func
};


/**
 * 下拉日期选择
 */
function DatePicker(props) {

    /**
     *
     * @type {{current: HTMLElement}}
     */
    const selectRef = useRef(null);
    /**
     *
     * @type {{current: HTMLElement}}
     */
    const contentRef = useRef(null);

    const {children,onChange} = props;
    const [open, setOpen] = useState(false);
    const [value,setValue] = useState('');
    const [showTitle,setShowTitle] = useState('');
    const prefix = 'bxer-date-picker';
    const selectClassName = classNames(prefix,
        {[`${prefix}__open`]: open});

    const options = React.Children.map(children,(option,index)=>{
        const {key:optionKey,value:optionValue,} = option.props;
        return React.cloneElement(option,{
            selected: optionValue=== value,
            onClick:(e)=>{
                const {dataset} = e.currentTarget;
                const {value} = dataset;
                setValue(value);
                onChange(value);
                setOpen(false)
            }
        })
    });



    useEffect(()=>{
        React.Children.forEach(children,(option)=>{
            const {key:optionKey,value:optionValue,children} = option.props;
            console.log(optionValue,value)
            if(optionValue === value){
                setShowTitle(children)
            }
        })
    },[open])


    return (
        <div className={selectClassName} ref={selectRef} onClick={() => {
            setOpen(!open)
        }}>
            <Popover
                className={`${prefix}__popover`}
                trigger={"click"}
                placement={'bottom'}
                open={open}
                onOpen={() => {
                    setOpen(true)
                }}
                onClose={() => {
                    setOpen(false)
                }}
                content={<Calendar onChange={(dateItem)=>{
                    const {year,month,day} =dateItem;
                    setShowTitle(`${year}-${month}-${day}`)
                    setOpen(false)
                }}/>}
            >
                <div className={`${prefix}__content`}>
                    <div>{showTitle || '请选择日期'}</div>
                    <Icon type={'arrow-left-s-fill'}></Icon>
                </div>
            </Popover>
        </div>
    );
}

export default DatePicker;
