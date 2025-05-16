import React from 'react';
import clsx from 'clsx';
import { Button, ButtonProps, Icon } from '@chatui/core';

export interface IconButtonProps extends ButtonProps {
  img?: string;
  iconClassName?: string;
}

export const IconButton: React.FC<IconButtonProps> = props => {
  const { className, icon, iconClassName, img, ...other } = props;
  return (
    <Button className={clsx('IconBtn', className)} data-icon={icon} {...other}>
      {iconClassName && <i className={clsx('iconfont', iconClassName)} />}
      {icon && <Icon type={icon} />}
      {!iconClassName && !icon && img && <img src={img} alt="" />}
    </Button>
  );
};
