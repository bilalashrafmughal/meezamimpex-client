import React from 'react'

export const ContactMethod = ({method, colSize})=>(
        <div className={`col-md-${colSize} contact-method`}>
            <div className="cm-icon-box">
                <i className={method.icon}>  </i>
            </div>
            <div className="cm-text-box">
                <p className="heading-text">
                    {method.text1}
                </p>
                <p className="main-text">
                {method.text2}
                </p>
            </div>
        </div>
    
)
