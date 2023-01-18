import React, {FunctionComponent, useState} from 'react';
import {LayoutChangeEvent, Text as RNText, TextProps, View} from 'react-native';

interface ITextProps extends TextProps {
  loading?: boolean;
  skeletonDisabled?: boolean;
}

const Text: FunctionComponent<ITextProps> = ({
  loading,
  skeletonDisabled = false,
  ...props
}) => {
  const [skeletonSize, setSkeletonSize] = useState<{
    width: number | string;
    height: number | string;
  } | null>(null);

  if (loading && !skeletonDisabled) {
    const onLayout = (event: LayoutChangeEvent) => {
      setSkeletonSize({
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      });
    };

    return (
      <>
        <RNText
          onLayout={onLayout}
          allowFontScaling={false}
          maxFontSizeMultiplier={1}
          adjustsFontSizeToFit={false}
          {...props}
          style={{...props.style, position: 'absolute', color: 'transparent'}}
        />
        {skeletonSize?.width && (
          <View
            style={{
              ...props.style,
              height: skeletonSize.height,
              width: skeletonSize.width,
              borderRadius: 8,
              alignSelf:
                props.style?.textAlign || props.style?.alignSelf || 'center',
            }}
          />
        )}
      </>
    );
  }

  return (
    <RNText
      allowFontScaling={false}
      maxFontSizeMultiplier={1}
      adjustsFontSizeToFit={false}
      {...props}
    />
  );
};

export default Text;
