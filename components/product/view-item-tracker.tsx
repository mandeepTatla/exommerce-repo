'use client';

import { sendGTMEvent } from '@next/third-parties/google';
import { useEffect } from 'react';

export function ViewItemTracker({ product }: any) {
  useEffect(() => {
    if (product?.id) {
      sendGTMEvent({
        event: 'view_item',
        product_id: product.id,
        product_name: product.title,
        price: product.price,
        currency: product.currency,
        page_url: window.location.href
      });
    }
  }, [product?.id]);

  return null;
}
