import React from 'react'
import '../pages/Auth/auth.css';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AuthInputField({ label, type, validName, valueName, id, onChange, setOnFocus, nameFocus, errNote, icon }) {
    return (
        <div className="mb-6">
            <label className="text-xs font-medium text-gray-700" htmlFor={id}>
                {label}
                <span className={validName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !valueName ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <div className={`relative mt-1 w-full ${icon ? 'pl-9' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-md`}>
                {icon && <FontAwesomeIcon icon={icon} style={{color: 'gray', fontSize: '14px'}} className='absolute top-3 left-3' />}
                <input
                    type={type}
                    id={id}
                    name={id}
                    // ref={emailRef}
                    value={valueName}
                    onChange={onChange}
                    className="bg-transparent block text-sm text-gray-900 focus:outline-none w-full"
                    required
                    autoComplete='off'
                    aria-invalid={() => validName ? 'false' : 'true'}
                    aria-describedby='uidnote'
                    onFocus={() => setOnFocus(true)}
                    onBlur={() => setOnFocus(false)}
                />
            </div>
            <p id='uidnote' className={nameFocus && valueName &&
                !validName ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                &nbsp;
                {errNote}
            </p>
        </div>
    )
}

export default AuthInputField