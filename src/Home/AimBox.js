import React from 'react'


const AimBox = ({boxProps, colSize})=>(
    <div className={`col-md-${colSize} aim-box `}>
                                <div className="icon-box">
                                    <img src={boxProps.icon} alt="icon" />
                                </div>
                                <h5> {boxProps.heading} </h5>
                            <p>  {boxProps.details} </p>
                            </div>
)

export default AimBox;