import React from 'react'
import '../pages/Auth/auth.css';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AuthInputField({ label, type, validName, valueName, id, onChange, setOnFocus, nameFocus, errNote, icon }) {
    return (
        <div className="mb-6">
            <label className="block text-black text-[13px] mb-1 lg:mb-2" htmlFor={id}>
                {label}
                <span className={validName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !valueName ? 'hide' : 'invalid'}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>
            <div className="relative w-full pl-9 pr-3 py-1 border border-gray rounded-lg">
                <FontAwesomeIcon icon={icon} style={{color: 'gray', fontSize: '14px'}} className='absolute top-2.5 left-3' />
                <input
                    type={type}
                    id={id}
                    name={id}
                    // ref={emailRef}
                    value={valueName}
                    onChange={onChange}
                    className="bg-transparent text-sm focus:outline-none w-full"
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