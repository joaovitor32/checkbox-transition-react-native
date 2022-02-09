//import Checkbox from './src/index';
//export default Checkbox;
import React, { useState } from 'react';
import { View } from 'react-native';

import Checkbox from './src';

const CheckboxContent = (): any => {
  const [state, setState] = useState<boolean | string>(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Checkbox
        value={state}
        checkedColor={'#ffc800'}
        uncheckedColor={'#800080'}
        checkHeight={170}
        checkWidth={180}
        onChange={setState}
        animationTime={150}
        disabled={false}
      />
    </View>
  );
};

export default CheckboxContent;
