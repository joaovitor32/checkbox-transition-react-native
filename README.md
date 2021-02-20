## Demo

## Usage - (Concept)

```tsx
import React,{useEffect, useState} from 'react';

import {View} from 'react-native';

import Checkbox from './src/Checkbox'

const CheckboxContent = ()=>{


    const [state,setState] = useState<boolean|string>(false);

    return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Checkbox
        value={state}
        checkedColor={"#ffc800"}
        uncheckedColor={"#800080"}
        checkHeight={170}
        checkWidth={180}
        onChange={setState}
        animationTime={150}
        disabled={false}
    />
    </View>)
}


export default CheckboxContent;
```

![Checkbox](demo/video.gif)
