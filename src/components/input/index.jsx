import React from 'react';
import classNames from 'classnames';
import './index.sass';
import PropTypes from 'prop-types';


Input.propTypes = {

};

function Input({className,...other}) {
    console.log(other,'123')
   const inputClassName = classNames(
        'bxer-input',
       className
    )
    return (
        <input  className={inputClassName} {...other}/>
    );
}

export default Input;
