import React, { useEffect, useRef } from 'react';
import { useLocale } from '@chatui/core';
import { IconButton, IconButtonProps } from '../IconButton'

interface SendButtonProps extends IconButtonProps {
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SendButton = ({ disabled, onClick, ...restProps }: SendButtonProps) => {
  const { trans } = useLocale('Composer');
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    if (wrap && btn) {
      wrap.style.setProperty('--send-width', `${btn.offsetWidth}px`);
    }
  }, [])

  return (
    <div className="Composer-actions" data-action="send" ref={wrapRef}>
      <IconButton
        className="Composer-sendBtn"
        disabled={disabled}
        onMouseDown={onClick}
        color="primary"
        {...restProps}
        ref={btnRef}
      >
        {trans('send')}
      </IconButton>
    </div>
  );
};
