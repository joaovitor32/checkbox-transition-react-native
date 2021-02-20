import React from 'react'

type CheckboxProps={

  value: boolean | string;
  onChange: Function;
  checkedColor: string;
  uncheckedColor: string;
  checkWidth: number;
  checkHeight: number,
  animationTime: number;
  disabled: boolean;
  backgroundColor?: string;
    
}

declare const Checkbox: React.FC<CheckboxProps>=()=>{}

export default Checkbox
