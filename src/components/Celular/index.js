import React from 'react';

import MaskedInput from 'react-text-mask';

export default function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[0-9]/,
        /[0-9]/,
        ')',
        /[9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '-',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
      ]}
    />
  );
}
