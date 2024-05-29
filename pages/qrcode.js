import React, { useEffect } from 'react';
import Router from 'next/router'

export default function QrCode() {
    useEffect(() => {
        Router.push('/')
      });
  return (<div></div>);
}
