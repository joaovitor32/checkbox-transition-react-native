import React, {
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react';

import {SvgXml} from 'react-native-svg';

import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

import Color from 'color';

type CheckboxProps = {
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

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  checkedColor,
  uncheckedColor,
  checkHeight,
  checkWidth,
  animationTime,
  backgroundColor,
  disabled,
  onChange,
}) => {

  const [colorCheckbox, setColorCheckbox] = useState<string>(!!value?checkedColor:uncheckedColor);
  let anim = useRef(new Animated.Value(0)).current

  /*---- Color interpolation -----*/
  const white = { r: 255, g: 255, b: 255 };

  const hexToRgb = (hex: string) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  const extractBrush = (colorOrBrush: string) => {
    const patternReg = /^url\(#(.+?)\)$/;

    if (colorOrBrush === 'none' || !colorOrBrush) {
      return null;
    }

    try {
      let matched = colorOrBrush.match(patternReg);
      // brush
      if (matched) {
        return [1, matched[1]];
        //todo:
      } else {
        let [r, g, b] = Color(colorOrBrush).rgb().array();
        setColorCheckbox(`rgb(${r},${g},${b})`);
      }
    } catch (err) {
      throw new Error(`"${colorOrBrush}" is not a valid color or brush`);
    }
  }

  const interpolateScale = (value: number) => {

    Animated.timing(
      anim, {
      toValue: value,
      duration: animationTime,
      useNativeDriver: true
    }).start()
  }

  let spin = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  anim.addListener(({ value }) => {

    const colors = [uncheckedColor, checkedColor].map(hexColor => hexToRgb(hexColor) || white);

    let r = Math.round(colors[0].r + ((colors[1].r - colors[0].r) * value));
    let g = Math.round(colors[0].g + ((colors[1].g - colors[0].g) * value));
    let b = Math.round(colors[0].b + ((colors[1].b - colors[0].b) * value));

    extractBrush(`rgb(${r},${g},${b})`)

  })

  const onChangeCheckbox = useCallback((valueProp: boolean) => {

    if (!!onChange && typeof value === "boolean") {
      onChange(valueProp);
    } else {
      throw new Error('An error occurred')
    }

  }, [])

  useEffect(() => {
   
    value ? (interpolateScale(1)) : (interpolateScale(0))

  }, [value])

  const xml=`<svg height="365.696pt" fill="none" viewBox="0 0 365.696 365.696" width="365.696pt" xmlns="http://www.w3.org/2000/svg"><path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"/></svg>`

  return (<View
      style={[
        styles.wrapper
      ]}
    >
      <TouchableOpacity
      
        disabled={disabled}
        style={
          [
            styles.touchable,
            {backgroundColor:!!backgroundColor ? backgroundColor : '#FFFFFF'},
            {borderColor:!!colorCheckbox?colorCheckbox:"black"}
          ]
        }
        onPress={() => onChangeCheckbox(!value)}>

        <Animated.View style={
          {
            transform: [
              { scale: anim },
              { rotate: spin },
            ]
          }
        }>

          <SvgXml
            xml={xml}
            fill={colorCheckbox}
            width={checkWidth}
            height={checkHeight}
          />

        </Animated.View>
      </TouchableOpacity>
    </View>)
  };

const styles = StyleSheet.create({

  wrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8
  },

  touchable:{
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default Checkbox;



