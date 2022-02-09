# Checkbox for React Native
## with color transition

### Installation

```bash
npm i checkbox-transition-react-native
```
### Properties

| Prop                      | Description                                                                                                                                                                                                                                                                                                             | Default        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **`value`**               | Initial state of the checkbox | none   
| **`onChange`**               | Function to change value of state | none
| **`checkedColor`**               | Checkbox color when state is true - HexCode only | none
| **` uncheckedColor`**               | Checkbox color when state is false - HexCode only | none
| **`checkHeight`**               | Height of the checkbox | none
| **`checkWidth`**               | Width of the checkbox | none
| **`animationTime`**               | animation duration time | none
| **`disable`**               | Set is possible to change state of a checkbox | none
| **`borderColor?`**               | Border color of the checkbox | State == true => checkedColor, State == false => uncheckedColor


##### Linking Android 

1. Append the following lines to `android/settings.gradle`:

   ```gradle
   include ':react-native-svg'
   project(':react-native-svg').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-svg/android')
   ```

2. Insert the following lines inside the dependencies block in `android/app/build.gradle`:

   ```gradle
   implementation project(':react-native-svg')
   ```

3. Open up `android/app/src/main/java/[...]/MainApplication.java`

- Add `import com.horcrux.svg.SvgPackage;` to the imports at the top of the file
- Add `new SvgPackage()` to the list returned by the `getPackages()` method. Add a comma to the previous item if there's already something there.

##### iOS 

[Manual linking](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking)

To install react-native-svg on iOS visit the link referenced above or do the following (react-native link should do this for you):

1. Open your project in XCode and drag the `RNSVG.xcodeproj` file (located in `.../node_modules/react-native-svg/ios`) into the Libraries directory shown in XCode.
2. Expand the `RNSVG.xcodeproj` file you just added to XCode until you see: `libRNSVG.a` (located in `RNSVG.xcodeproj` > `Products` )
3. Drag `libRNSVG.a` into the Link Binary With Libraries section (located in Build Phases which may be found at the top of the XCode window)

###### CocoaPods

Alternatively, you can use [CocoaPods](https://cocoapods.org/) to manage your native (Objective-C and Swift) dependencies:

1. Add RNSVG to your Podfile (with RN 0.60+ autolinking, this is not needed)

```ruby
pod 'RNSVG', :path => '../node_modules/react-native-svg'
```

If `cocoapods` is used and if error `RNSVGImage.m:12:9: 'React/RCTImageLoader.h' file not found` occurs:

Add the following entry in Podfile:

```ruby
    pod 'React', :path => '../node_modules/react-native', :subspecs => [
        [...]
        'RCTImage', # <-- Add RCTImage
    ]
```

and run `pod install` from `ios` folder

## Usage 

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';

import Checkbox from 'checkbox-transition-react-native'

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

```
## Demo

![Checkbox](demo/video.gif)
